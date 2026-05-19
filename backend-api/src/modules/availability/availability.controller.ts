import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AvailabilityService } from './availability.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post('rules/:serviceId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set availability rules for a service' })
  async setRules(
    @Param('serviceId') serviceId: string,
    @Body() rules: Array<{ dayOfWeek: string; startTime: string; endTime: string }>,
  ) {
    return this.availabilityService.setRules(serviceId, rules);
  }

  @Get('rules/:serviceId')
  @Public()
  @ApiOperation({ summary: 'Get availability rules for a service' })
  async getRules(@Param('serviceId') serviceId: string) {
    return this.availabilityService.getRules(serviceId);
  }

  @Post('generate/:serviceId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate slots for a date range' })
  async generateSlots(
    @Param('serviceId') serviceId: string,
    @Body() body: { startDate: string; endDate: string },
  ) {
    return this.availabilityService.generateSlots(
      serviceId,
      new Date(body.startDate),
      new Date(body.endDate),
    );
  }

  @Get('slots/:serviceId')
  @Public()
  @ApiOperation({ summary: 'Get available slots for a date' })
  @ApiQuery({ name: 'date', required: true })
  async getSlots(
    @Param('serviceId') serviceId: string,
    @Query('date') date: string,
  ) {
    return this.availabilityService.getSlots(serviceId, date);
  }

  @Patch('slots/:slotId/block')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle slot block status' })
  async toggleBlock(
    @Param('slotId') slotId: string,
    @Body() body: { isBlocked: boolean },
  ) {
    return this.availabilityService.toggleSlotBlock(slotId, body.isBlocked);
  }

  @Patch('slots/:slotId/price')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update slot price' })
  async updatePrice(
    @Param('slotId') slotId: string,
    @Body() body: { price: number },
  ) {
    return this.availabilityService.updateSlotPrice(slotId, body.price);
  }
}
