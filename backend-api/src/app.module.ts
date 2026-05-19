// ============================================================
// Root Application Module
// ============================================================

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';

// Core modules
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { SupabaseModule } from './common/supabase/supabase.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { ServicesModule } from './modules/services/services.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { QRModule } from './modules/qr/qr.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { GeolocationModule } from './modules/geolocation/geolocation.module';
import { WebsocketModule } from './modules/websocket/websocket.module';

import { BookingTypesModule } from './modules/booking-types/booking-types.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Scheduled tasks
    ScheduleModule.forRoot(),

    // BullMQ job queues
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),

    // Core
    PrismaModule,
    RedisModule,
    SupabaseModule,

    // Features
    AuthModule,
    UsersModule,
    MerchantsModule,
    ServicesModule,
    AvailabilityModule,
    BookingsModule,
    PaymentsModule,
    NotificationsModule,
    QRModule,
    AnalyticsModule,
    GeolocationModule,
    WebsocketModule,
    BookingTypesModule,
  ],
})
export class AppModule {}
