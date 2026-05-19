import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GeolocationService } from './geolocation.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('geolocation')
@Controller('geo')
export class GeolocationController {
  constructor(private geoService: GeolocationService) {}

  @Get('nearby')
  @Public()
  @ApiOperation({ summary: 'Find nearby merchants' })
  @ApiQuery({ name: 'lat', required: true }) @ApiQuery({ name: 'lng', required: true })
  @ApiQuery({ name: 'radius', required: false }) @ApiQuery({ name: 'limit', required: false })
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.geoService.findNearby(lat, lng, radius, limit, offset);
  }

  @Get('bounds')
  @Public()
  @ApiOperation({ summary: 'Get merchants in map bounds' })
  async getMerchantsInBounds(
    @Query('swLat') swLat: number,
    @Query('swLng') swLng: number,
    @Query('neLat') neLat: number,
    @Query('neLng') neLng: number,
    @Query('limit') limit?: number,
  ) {
    return this.geoService.getMerchantsInBounds(swLat, swLng, neLat, neLng, limit);
  }
}
