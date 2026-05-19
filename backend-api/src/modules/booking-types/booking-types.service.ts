import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BookingTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(featuredOnly = false) {
    return this.prisma.bookingType.findMany({
      where: {
        isActive: true,
        ...(featuredOnly ? { isFeatured: true } : {}),
      },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { categories: true, merchants: true } },
      },
    });
  }

  async findBySlug(slug: string) {
    const bookingType = await this.prisma.bookingType.findUnique({
      where: { slug, isActive: true },
      include: {
        categories: {
          where: { isActive: true, parentId: null },
          orderBy: { sortOrder: 'asc' },
          include: {
            _count: { select: { services: true } },
            children: {
              where: { isActive: true },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
        _count: { select: { merchants: true } },
      },
    });
    if (!bookingType) throw new NotFoundException(`Booking type '${slug}' not found`);
    return bookingType;
  }
}
