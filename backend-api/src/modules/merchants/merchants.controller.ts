import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('merchants')
@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a merchant' })
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateMerchantDto,
  ) {
    return this.merchantsService.create(user.sub, dto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List all merchants' })
  @ApiQuery({ name: 'city', required: false })
  async findAll(@Query() pagination: PaginationDto, @Query('city') city?: string) {
    return this.merchantsService.findAll(pagination, city);
  }

  @Get('dashboard/:merchantId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get merchant dashboard data' })
  async getDashboard(@Param('merchantId') merchantId: string) {
    return this.merchantsService.getMerchantDashboard(merchantId);
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get merchant by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.merchantsService.findBySlug(slug);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get merchant by ID' })
  async findById(@Param('id') id: string) {
    return this.merchantsService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update merchant' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateMerchantDto,
  ) {
    return this.merchantsService.update(id, user.sub, dto);
  }
}
