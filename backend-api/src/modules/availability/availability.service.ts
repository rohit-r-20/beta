// ============================================================
// Availability Service — Slot generation & management
// ============================================================

import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/redis/redis.service';

@Injectable()
export class AvailabilityService {
  private readonly logger = new Logger(AvailabilityService.name);

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /**
   * Set availability rules for a service
   */
  async setRules(serviceId: string, rules: Array<{
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }>) {
    // Delete existing rules
    await this.prisma.availabilityRule.deleteMany({ where: { serviceId } });

    // Create new rules
    return this.prisma.availabilityRule.createMany({
      data: rules.map((r) => ({
        serviceId,
        dayOfWeek: r.dayOfWeek as any,
        startTime: r.startTime,
        endTime: r.endTime,
      })),
    });
  }

  /**
   * Get availability rules for a service
   */
  async getRules(serviceId: string) {
    return this.prisma.availabilityRule.findMany({
      where: { serviceId, isActive: true },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  /**
   * Generate slots for a service on a given date range
   * Based on availability rules, duration, and buffer time
   */
  async generateSlots(
    serviceId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { availabilityRules: { where: { isActive: true } } },
    });

    if (!service) throw new NotFoundException('Service not found');

    const slots: Array<{
      serviceId: string;
      date: Date;
      startTime: Date;
      endTime: Date;
      maxCapacity: number;
      price: number;
    }> = [];

    const dayMap: Record<string, number> = {
      SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3,
      THURSDAY: 4, FRIDAY: 5, SATURDAY: 6,
    };

    const current = new Date(startDate);
    while (current <= endDate) {
      const dayOfWeek = current.getDay();
      const dayRules = service.availabilityRules.filter(
        (r: any) => dayMap[r.dayOfWeek] === dayOfWeek,
      );

      for (const rule of dayRules) {
        const [startH, startM] = rule.startTime.split(':').map(Number);
        const [endH, endM] = rule.endTime.split(':').map(Number);

        let slotStart = new Date(current);
        slotStart.setHours(startH, startM, 0, 0);

        const ruleEnd = new Date(current);
        ruleEnd.setHours(endH, endM, 0, 0);

        while (slotStart < ruleEnd) {
          const slotEnd = new Date(
            slotStart.getTime() + service.durationMinutes * 60 * 1000,
          );

          if (slotEnd <= ruleEnd) {
            slots.push({
              serviceId,
              date: new Date(current.toISOString().split('T')[0]),
              startTime: new Date(slotStart),
              endTime: new Date(slotEnd),
              maxCapacity: service.maxCapacity,
              price: Number(service.basePrice),
            });
          }

          // Move to next slot (duration + buffer)
          slotStart = new Date(
            slotStart.getTime() +
            (service.durationMinutes + service.bufferMinutes) * 60 * 1000,
          );
        }
      }

      current.setDate(current.getDate() + 1);
    }

    // Upsert slots (skip existing)
    let created = 0;
    for (const slot of slots) {
      try {
        await this.prisma.bookingSlot.upsert({
          where: {
            serviceId_startTime: {
              serviceId: slot.serviceId,
              startTime: slot.startTime,
            },
          },
          update: {},
          create: slot,
        });
        created++;
      } catch (e) {
        // Skip duplicate
      }
    }

    this.logger.log(`Generated ${created} slots for service ${serviceId}`);
    return { generated: created, total: slots.length };
  }

  /**
   * Get available slots for a service on a date
   */
  async getSlots(serviceId: string, date: string) {
    const targetDate = new Date(date);

    return this.prisma.bookingSlot.findMany({
      where: {
        serviceId,
        date: targetDate,
        isBlocked: false,
        isAvailable: true,
      },
      orderBy: { startTime: 'asc' },
    });
  }

  /**
   * Block/unblock a specific slot
   */
  async toggleSlotBlock(slotId: string, isBlocked: boolean) {
    return this.prisma.bookingSlot.update({
      where: { id: slotId },
      data: { isBlocked },
    });
  }

  /**
   * Block all slots on a date range (e.g., holidays)
   */
  async blockDateRange(serviceId: string, startDate: Date, endDate: Date) {
    return this.prisma.bookingSlot.updateMany({
      where: {
        serviceId,
        date: { gte: startDate, lte: endDate },
      },
      data: { isBlocked: true },
    });
  }

  /**
   * Update slot pricing
   */
  async updateSlotPrice(slotId: string, price: number) {
    return this.prisma.bookingSlot.update({
      where: { id: slotId },
      data: { price },
    });
  }
}
