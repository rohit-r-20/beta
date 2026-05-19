import { Controller, Post, Get, Body, Param, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-order')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a payment order' })
  async createOrder(
    @CurrentUser() user: JwtPayload,
    @Body() body: {
      bookingId: string;
      amount: number;
      currency?: string;
      provider?: string;
    },
  ) {
    return this.paymentsService.createOrder(
      body.bookingId,
      user.sub,
      body.amount,
      body.currency,
      body.provider,
    );
  }

  @Post('webhook/:provider')
  @Public()
  @ApiOperation({ summary: 'Payment webhook handler' })
  async webhook(
    @Param('provider') provider: string,
    @Body() body: any,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    const isValid = await this.paymentsService.verifyPayment(
      provider.toUpperCase(),
      body,
      signature,
    );

    if (!isValid) {
      return { status: 'invalid_signature' };
    }

    // Handle payment events
    if (body.event === 'payment.captured' || body.event === 'order.paid') {
      const paymentEntity = body.payload?.payment?.entity;
      if (paymentEntity) {
        await this.paymentsService.handlePaymentSuccess(
          paymentEntity.id,
          paymentEntity.order_id,
        );
      }
    }

    return { status: 'ok' };
  }

  @Get('booking/:bookingId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment for a booking' })
  async getByBooking(@Param('bookingId') bookingId: string) {
    return this.paymentsService.getPaymentByBooking(bookingId);
  }

  @Post(':id/refund')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refund a payment' })
  async refund(
    @Param('id') id: string,
    @Body() body: { amount?: number },
  ) {
    return this.paymentsService.refund(id, body.amount);
  }
}
