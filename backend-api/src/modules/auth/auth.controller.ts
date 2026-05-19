import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sync')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sync user from external auth token' })
  async syncUser(@CurrentUser() user: JwtPayload) {
    return this.authService.syncUser(user.sub, user.email, user.name);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  async getMe(@CurrentUser() user: JwtPayload) {
    return this.authService.getUserByAuthId(user.sub);
  }

  @Get('health')
  @Public()
  @ApiOperation({ summary: 'Auth health check' })
  healthCheck() {
    return { status: 'ok', service: 'auth' };
  }
}
