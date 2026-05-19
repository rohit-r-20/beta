import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  /**
   * Sync user from external auth token payload
   * Creates or updates user record on first API call
   */
  async syncUser(externalAuthId: string, email: string, name: string) {
    const user = await this.prisma.user.upsert({
      where: { externalAuthId },
      update: { email, name, updatedAt: new Date() },
      create: { externalAuthId, email, name },
    });

    this.logger.debug(`User synced: ${user.id} (${email})`);
    return user;
  }

  /**
   * Get internal user by external auth ID
   */
  async getUserByAuthId(externalAuthId: string) {
    return this.prisma.user.findUnique({
      where: { externalAuthId, deletedAt: null },
    });
  }
}
