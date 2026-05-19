// ============================================================
// Booking Queue Processor — Handles async booking tasks
// ============================================================

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { BookingsService } from './bookings.service';

@Processor('booking-queue')
export class BookingProcessor extends WorkerHost {
  private readonly logger = new Logger(BookingProcessor.name);

  constructor(private bookingsService: BookingsService) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    this.logger.log(`Processing job: ${job.name} [${job.id}]`);

    switch (job.name) {
      case 'check-booking-expiry':
        await this.handleBookingExpiry(job.data);
        break;

      case 'send-confirmation':
        await this.handleConfirmation(job.data);
        break;

      case 'process-refund':
        await this.handleRefund(job.data);
        break;

      default:
        this.logger.warn(`Unknown job type: ${job.name}`);
    }
  }

  private async handleBookingExpiry(data: {
    bookingId: string;
    slotId: string;
    attendeeCount: number;
  }) {
    try {
      await this.bookingsService.expireBookingHold(
        data.bookingId,
        data.slotId,
        data.attendeeCount,
      );
      this.logger.log(`Booking expiry checked: ${data.bookingId}`);
    } catch (error) {
      this.logger.error(`Error checking booking expiry: ${(error as Error).message}`);
      throw error;
    }
  }

  private async handleConfirmation(data: {
    bookingId: string;
    userId: string;
    bookingReference: string;
  }) {
    // TODO: Send confirmation email/notification
    this.logger.log(`Confirmation sent for: ${data.bookingReference}`);
  }

  private async handleRefund(data: { bookingId: string }) {
    // TODO: Process refund via payment provider
    this.logger.log(`Refund queued for booking: ${data.bookingId}`);
  }
}
