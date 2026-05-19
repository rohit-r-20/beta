// ============================================================
// Payment Service — Abstraction layer for payment providers
// ============================================================

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RazorpayProvider } from './providers/razorpay.provider';

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  provider: string;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private razorpay: RazorpayProvider,
  ) {}

  /**
   * Create a payment order
   */
  async createOrder(
    bookingId: string,
    userId: string,
    amount: number,
    currency: string = 'INR',
    provider: string = 'RAZORPAY',
  ): Promise<PaymentOrder> {
    // Create order via provider
    let providerOrder: { id: string; amount: number; currency: string };

    switch (provider) {
      case 'RAZORPAY':
        providerOrder = await this.razorpay.createOrder(amount, currency, bookingId);
        break;
      case 'STRIPE':
        // Future: Stripe integration
        throw new BadRequestException('Stripe integration coming soon');
      default:
        throw new BadRequestException(`Unknown payment provider: ${provider}`);
    }

    // Create payment record
    const payment = await this.prisma.payment.create({
      data: {
        bookingId,
        userId,
        amount,
        currency,
        provider: provider as any,
        providerOrderId: providerOrder.id,
        status: 'PENDING',
      },
    });

    this.logger.log(`Payment order created: ${payment.id} via ${provider}`);

    return {
      orderId: providerOrder.id,
      amount: providerOrder.amount,
      currency: providerOrder.currency,
      provider,
      metadata: { paymentId: payment.id },
    };
  }

  /**
   * Verify payment webhook
   */
  async verifyPayment(
    provider: string,
    payload: Record<string, any>,
    signature: string,
  ) {
    switch (provider) {
      case 'RAZORPAY':
        return this.razorpay.verifyWebhook(payload, signature);
      default:
        throw new BadRequestException(`Unknown provider: ${provider}`);
    }
  }

  /**
   * Handle successful payment
   */
  async handlePaymentSuccess(
    providerPaymentId: string,
    providerOrderId: string,
  ) {
    const payment = await this.prisma.payment.findFirst({
      where: { providerOrderId },
    });

    if (!payment) {
      this.logger.error(`Payment not found for order: ${providerOrderId}`);
      return;
    }

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'COMPLETED',
        providerPaymentId,
        paidAt: new Date(),
      },
    });

    this.logger.log(`Payment completed: ${payment.id}`);
    return payment;
  }

  /**
   * Process refund
   */
  async refund(paymentId: string, amount?: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) throw new BadRequestException('Payment not found');
    if (payment.status !== 'COMPLETED') {
      throw new BadRequestException('Can only refund completed payments');
    }

    const refundAmount = amount || Number(payment.amount);

    switch (payment.provider) {
      case 'RAZORPAY':
        await this.razorpay.refund(payment.providerPaymentId!, refundAmount);
        break;
    }

    await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: amount && amount < Number(payment.amount) ? 'PARTIALLY_REFUNDED' : 'REFUNDED',
        refundAmount,
        refundedAt: new Date(),
      },
    });

    this.logger.log(`Refund processed: ${paymentId} for ${refundAmount}`);
  }

  async getPaymentByBooking(bookingId: string) {
    return this.prisma.payment.findUnique({ where: { bookingId } });
  }
}
