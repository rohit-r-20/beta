import { Module } from '@nestjs/common';
import { BookingTypesController } from './booking-types.controller';
import { BookingTypesService } from './booking-types.service';

@Module({
  controllers: [BookingTypesController],
  providers: [BookingTypesService],
  exports: [BookingTypesService],
})
export class BookingTypesModule {}
