import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BookingTypesService } from './booking-types.service';

@ApiTags('Booking Types')
@Controller({ path: 'booking-types', version: '1' })
export class BookingTypesController {
  constructor(private readonly service: BookingTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all booking types (marketplace top-level categories)' })
  findAll(@Query('featured') featured?: string) {
    return this.service.findAll(featured === 'true');
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a booking type with its subcategories' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }
}
