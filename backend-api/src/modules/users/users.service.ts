import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      include: {
        bookings: { take: 5, orderBy: { createdAt: 'desc' } },
        favorites: { include: { service: true } },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByAuthId(externalAuthId: string) {
    return this.prisma.user.findUnique({
      where: { externalAuthId, deletedAt: null },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async softDelete(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }

  async getUserBookings(userId: string, status?: string) {
    return this.prisma.booking.findMany({
      where: {
        userId,
        deletedAt: null,
        ...(status ? { status: status as any } : {}),
      },
      include: {
        service: { select: { id: true, name: true, images: true, durationMinutes: true } },
        merchant: { select: { id: true, name: true, logoUrl: true } },
        slot: true,
        qrCheckin: true,
      },
      orderBy: { scheduledStart: 'desc' },
    });
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        service: {
          include: {
            merchant: { select: { id: true, name: true, logoUrl: true, city: true } },
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async toggleFavorite(userId: string, serviceId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_serviceId: { userId, serviceId } },
    });

    if (existing) {
      await this.prisma.favorite.delete({ where: { id: existing.id } });
      return { favorited: false };
    }

    await this.prisma.favorite.create({ data: { userId, serviceId } });
    return { favorited: true };
  }
}
