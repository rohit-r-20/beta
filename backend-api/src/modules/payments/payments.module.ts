import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { RazorpayProvider } from './providers/razorpay.provider';

@Module({
  imports: [BullModule.registerQueue({ name: 'payment-queue' })],
  controllers: [PaymentsController],
  providers: [PaymentsService, RazorpayProvider],
  exports: [PaymentsService],
})
export class PaymentsModule {}
