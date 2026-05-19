import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('merchant/:merchantId')
  @ApiOperation({ summary: 'Get merchant analytics' })
  async getMerchantAnalytics(
    @Param('merchantId') merchantId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getMerchantAnalytics(
      merchantId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('global')
  @ApiOperation({ summary: 'Get global platform stats' })
  async getGlobalStats() {
    return this.analyticsService.getGlobalStats();
  }
}
