import { Controller, Get, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() user: JwtPayload) {
    return this.usersService.findByAuthId(user.sub);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateUserDto,
  ) {
    const dbUser = await this.usersService.findByAuthId(user.sub);
    return this.usersService.update(dbUser!.id, dto);
  }

  @Get('bookings')
  @ApiOperation({ summary: 'Get user bookings' })
  @ApiQuery({ name: 'status', required: false })
  async getBookings(
    @CurrentUser() user: JwtPayload,
    @Query('status') status?: string,
  ) {
    const dbUser = await this.usersService.findByAuthId(user.sub);
    return this.usersService.getUserBookings(dbUser!.id, status);
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Get user favorites' })
  async getFavorites(@CurrentUser() user: JwtPayload) {
    const dbUser = await this.usersService.findByAuthId(user.sub);
    return this.usersService.getUserFavorites(dbUser!.id);
  }

  @Patch('favorites/:serviceId')
  @ApiOperation({ summary: 'Toggle favorite for a service' })
  async toggleFavorite(
    @CurrentUser() user: JwtPayload,
    @Param('serviceId') serviceId: string,
  ) {
    const dbUser = await this.usersService.findByAuthId(user.sub);
    return this.usersService.toggleFavorite(dbUser!.id, serviceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
