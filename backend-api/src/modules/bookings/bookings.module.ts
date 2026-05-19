import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingProcessor } from './booking.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'booking-queue' }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingProcessor],
  exports: [BookingsService],
})
export class BookingsModule {}
