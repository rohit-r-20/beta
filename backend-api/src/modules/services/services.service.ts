import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationDto, createPaginatedResponse } from '../../common/dto/pagination.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(merchantId: string, dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        ...(dto as any),
        merchantId,
        slug: this.generateSlug(dto.name),
      },
    });
  }

  async findAll(
    pagination: PaginationDto,
    filters?: {
      categoryId?: string;
      serviceType?: string;
      merchantId?: string;
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      isFeatured?: boolean;
    },
  ) {
    const where: any = {
      isActive: true,
      deletedAt: null,
    };

    if (filters?.categoryId) where.categoryId = filters.categoryId;
    if (filters?.serviceType) where.serviceType = filters.serviceType;
    if (filters?.merchantId) where.merchantId = filters.merchantId;
    if (filters?.isFeatured) where.isFeatured = true;
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { tags: { has: filters.search.toLowerCase() } },
      ];
    }
    if (filters?.minPrice || filters?.maxPrice) {
      where.basePrice = {};
      if (filters?.minPrice) where.basePrice.gte = filters.minPrice;
      if (filters?.maxPrice) where.basePrice.lte = filters.maxPrice;
    }

    const [data, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { [pagination.sortBy || 'createdAt']: pagination.sortOrder || 'desc' },
        include: {
          merchant: {
            select: { id: true, name: true, slug: true, logoUrl: true, city: true, rating: true },
          },
          category: true,
          _count: { select: { bookings: true, reviews: true } },
        },
      }),
      this.prisma.service.count({ where }),
    ]);

    return createPaginatedResponse(data, total, pagination);
  }

  async findById(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id, deletedAt: null },
      include: {
        merchant: true,
        category: true,
        availabilityRules: { where: { isActive: true } },
        reviews: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { name: true, avatarUrl: true } } },
        },
        _count: { select: { bookings: true, reviews: true, favorites: true } },
      },
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async findBySlug(merchantId: string, slug: string) {
    const service = await this.prisma.service.findUnique({
      where: { merchantId_slug: { merchantId, slug }, deletedAt: null },
      include: {
        merchant: true,
        category: true,
        availabilityRules: { where: { isActive: true } },
        reviews: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { name: true, avatarUrl: true } } },
        },
        _count: { select: { bookings: true, reviews: true, favorites: true } },
      },
    });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(id: string, dto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: dto as any,
    });
  }

  async softDelete(id: string) {
    return this.prisma.service.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }

  async getCategories() {
    return this.prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { services: true } } },
    });
  }

  async getFeatured(limit = 12) {
    return this.prisma.service.findMany({
      where: { isActive: true, isFeatured: true, deletedAt: null },
      take: limit,
      orderBy: { rating: 'desc' },
      include: {
        merchant: {
          select: { id: true, name: true, slug: true, logoUrl: true, city: true },
        },
        category: true,
      },
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
