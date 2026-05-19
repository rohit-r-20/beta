import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getMerchantAnalytics(merchantId: string, startDate?: Date, endDate?: Date) {
    const dateFilter = {
      ...(startDate ? { gte: startDate } : {}),
      ...(endDate ? { lte: endDate } : {}),
    };

    const [
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      revenue,
      bookingsByDay,
      topServices,
      revenueByMonth,
    ] = await Promise.all([
      this.prisma.booking.count({
        where: { merchantId, deletedAt: null, ...(startDate ? { createdAt: dateFilter } : {}) },
      }),
      this.prisma.booking.count({
        where: { merchantId, status: 'CONFIRMED', deletedAt: null },
      }),
      this.prisma.booking.count({
        where: { merchantId, status: 'CANCELLED', deletedAt: null },
      }),
      this.prisma.booking.count({
        where: { merchantId, status: 'COMPLETED', deletedAt: null },
      }),
      this.prisma.payment.aggregate({
        where: { booking: { merchantId }, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
      this.prisma.booking.groupBy({
        by: ['bookedAt'],
        where: { merchantId, deletedAt: null },
        _count: true,
        orderBy: { bookedAt: 'desc' },
        take: 30,
      }),
      this.prisma.booking.groupBy({
        by: ['serviceId'],
        where: { merchantId, deletedAt: null },
        _count: true,
        orderBy: { _count: { serviceId: 'desc' } },
        take: 10,
      }),
      this.prisma.payment.groupBy({
        by: ['createdAt'],
        where: { booking: { merchantId }, status: 'COMPLETED' },
        _sum: { amount: true },
        orderBy: { createdAt: 'desc' },
        take: 12,
      }),
    ]);

    return {
      overview: {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        completedBookings,
        totalRevenue: revenue._sum.amount || 0,
        conversionRate: totalBookings > 0
          ? ((confirmedBookings + completedBookings) / totalBookings * 100).toFixed(1)
          : 0,
      },
      bookingsByDay,
      topServices,
      revenueByMonth,
    };
  }

  async getGlobalStats() {
    const [totalUsers, totalMerchants, totalBookings, totalRevenue] = await Promise.all([
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.merchant.count({ where: { isActive: true } }),
      this.prisma.booking.count({ where: { deletedAt: null } }),
      this.prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalUsers,
      totalMerchants,
      totalBookings,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }
}
