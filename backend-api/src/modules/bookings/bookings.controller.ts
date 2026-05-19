import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/guards/jwt-auth.guard';

@ApiTags('bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post('reserve')
  @ApiOperation({ summary: 'Reserve a booking slot (Step 1 of booking flow)' })
  async reserve(
    @CurrentUser() user: JwtPayload,
    @Body() body: {
      slotId: string;
      serviceId: string;
      attendeeCount?: number;
      notes?: string;
    },
  ) {
    const dbUser = user as any; // Will be resolved via auth service
    return this.bookingsService.reserveSlot(
      user.sub,
      body.slotId,
      body.serviceId,
      body.attendeeCount || 1,
      body.notes,
    );
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Confirm booking after payment (Step 2)' })
  async confirm(
    @Param('id') id: string,
    @Body() body: { paymentId: string },
  ) {
    return this.bookingsService.confirmBooking(id, body.paymentId);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a booking' })
  async cancel(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() body: { reason?: string },
  ) {
    return this.bookingsService.cancelBooking(id, user.sub, body.reason);
  }

  @Get('reference/:reference')
  @ApiOperation({ summary: 'Get booking by reference' })
  async findByReference(@Param('reference') reference: string) {
    return this.bookingsService.findByReference(reference);
  }

  @Get('merchant/:merchantId')
  @ApiOperation({ summary: 'Get merchant bookings' })
  @ApiQuery({ name: 'status', required: false })
  async findByMerchant(
    @Param('merchantId') merchantId: string,
    @Query() pagination: PaginationDto,
    @Query('status') status?: string,
  ) {
    return this.bookingsService.findByMerchant(merchantId, pagination, status);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get current user bookings' })
  @ApiQuery({ name: 'status', required: false })
  async findByUser(
    @CurrentUser() user: JwtPayload,
    @Query('status') status?: string,
  ) {
    return this.bookingsService.findByUser(user.sub, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  async findById(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }
}
