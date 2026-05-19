import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { QRService } from './qr.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/guards/jwt-auth.guard';

@ApiTags('qr')
@ApiBearerAuth()
@Controller('qr')
export class QRController {
  constructor(private qrService: QRService) {}

  @Post('generate/:bookingId')
  @ApiOperation({ summary: 'Generate QR code for a booking' })
  async generate(@Param('bookingId') bookingId: string) {
    return this.qrService.generateQR(bookingId);
  }

  @Post('checkin')
  @ApiOperation({ summary: 'Validate and check-in via QR code' })
  async checkin(
    @CurrentUser() user: JwtPayload,
    @Body() body: { qrToken: string },
  ) {
    return this.qrService.validateAndCheckin(body.qrToken, user.sub);
  }

  @Post('revoke/:bookingId')
  @ApiOperation({ summary: 'Revoke QR code for a booking' })
  async revoke(@Param('bookingId') bookingId: string) {
    return this.qrService.revokeQR(bookingId);
  }
}
