// ============================================================
// QR Check-in Service — Secure QR generation & validation
// ============================================================

import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import * as QRCode from 'qrcode';
import * as crypto from 'crypto';

const QR_EXPIRY_HOURS = 24;

@Injectable()
export class QRService {
  private readonly logger = new Logger(QRService.name);
  private readonly qrSecret: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.qrSecret = this.configService.get<string>('QR_SECRET', 'default-qr-secret');
  }

  /**
   * Generate a secure QR code for a booking
   */
  async generateQR(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status !== 'CONFIRMED') {
      throw new BadRequestException('QR can only be generated for confirmed bookings');
    }

    // Check if QR already exists
    const existing = await this.prisma.qRCheckin.findUnique({
      where: { bookingId },
    });
    if (existing && existing.status === 'ACTIVE') {
      const qrDataUrl = await QRCode.toDataURL(existing.qrToken);
      return { qrToken: existing.qrToken, qrImage: qrDataUrl, expiresAt: existing.expiresAt };
    }

    // Generate secure token
    const tokenData = `${bookingId}:${Date.now()}:${crypto.randomBytes(16).toString('hex')}`;
    const qrToken = crypto
      .createHmac('sha256', this.qrSecret)
      .update(tokenData)
      .digest('hex');

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + QR_EXPIRY_HOURS);

    // Create QR record
    const qrCheckin = await this.prisma.qRCheckin.create({
      data: {
        bookingId,
        qrToken,
        expiresAt,
      },
    });

    // Generate QR code image
    const qrDataUrl = await QRCode.toDataURL(qrToken, {
      width: 400,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    this.logger.log(`QR generated for booking: ${bookingId}`);

    return {
      qrToken: qrCheckin.qrToken,
      qrImage: qrDataUrl,
      expiresAt: qrCheckin.expiresAt,
    };
  }

  /**
   * Validate and check-in a QR code
   * Prevents reuse and fake check-ins
   */
  async validateAndCheckin(qrToken: string, checkedInById: string) {
    const qrCheckin = await this.prisma.qRCheckin.findUnique({
      where: { qrToken },
      include: {
        booking: {
          include: {
            user: { select: { name: true, email: true, avatarUrl: true } },
            service: { select: { name: true } },
          },
        },
      },
    });

    if (!qrCheckin) {
      throw new BadRequestException('Invalid QR code');
    }

    // Prevent reuse
    if (qrCheckin.status === 'USED') {
      throw new BadRequestException('QR code has already been used');
    }

    // Check expiry
    if (qrCheckin.status === 'EXPIRED' || new Date() > qrCheckin.expiresAt) {
      await this.prisma.qRCheckin.update({
        where: { id: qrCheckin.id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('QR code has expired');
    }

    // Check revocation
    if (qrCheckin.status === 'REVOKED') {
      throw new BadRequestException('QR code has been revoked');
    }

    // Validate booking status
    if (qrCheckin.booking.status !== 'CONFIRMED') {
      throw new BadRequestException(
        `Cannot check-in: booking is ${qrCheckin.booking.status}`,
      );
    }

    // Perform check-in
    await this.prisma.$transaction([
      this.prisma.qRCheckin.update({
        where: { id: qrCheckin.id },
        data: {
          status: 'USED',
          checkedInAt: new Date(),
          checkedInById,
        },
      }),
      this.prisma.booking.update({
        where: { id: qrCheckin.bookingId },
        data: { status: 'CHECKED_IN' },
      }),
    ]);

    this.logger.log(`Check-in successful for booking: ${qrCheckin.bookingId}`);

    return {
      success: true,
      booking: qrCheckin.booking,
      checkedInAt: new Date(),
    };
  }

  /**
   * Revoke a QR code
   */
  async revokeQR(bookingId: string) {
    return this.prisma.qRCheckin.updateMany({
      where: { bookingId, status: 'ACTIVE' },
      data: { status: 'REVOKED' },
    });
  }
}
