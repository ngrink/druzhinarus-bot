import { Injectable, OnModuleInit } from '@nestjs/common';

import { CategoryDto } from '@/shared/generated/prisma/types/category.dto';
import { CategoryScheduleDto } from '@/shared/generated/prisma/types/categorySchedule.dto';
import { CreateCategoryDto, UpdateCategoryDto, UpdateScheduleDto } from '@/shared/dto/categories';

import { PrismaService } from '@/config/';


@Injectable()
export class CategoriesRepository  implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$connect();

    const schedule = await this.getSchedule();
    if (schedule.length == 0) {
      await this.prisma.categorySchedule.createMany({
        data: Array(7 * 24).fill(0).map((_, idx) => ({
          weekday: Math.floor(idx / 24),
          hour: idx % 24,
          categoryId: null,
        }))
      })
    }
  }

  async createCategory(data: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.prisma.category.create({
      data
    });

    return category
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.prisma.category.findMany()

    return categories
  }

  async getCategory(id: number): Promise<CategoryDto> {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    })

    return category
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.prisma.category.update({
      where: {
        id
      },
      data
    })

    return category
  }

  async deleteCategory(id: number): Promise<CategoryDto> {
    const category = await this.prisma.category.delete({
      where: {
        id
      }
    })

    return category
  }

  async getSchedule(): Promise<CategoryScheduleDto[]> {
    const schedule = await this.prisma.categorySchedule.findMany({
      orderBy: [
        { weekday: 'asc' },
        { hour: 'asc' }
      ]
    })

    return schedule
  }

  async getCategorySchedule(categoryId: number): Promise<CategoryScheduleDto[]> {
    const schedule = await this.prisma.categorySchedule.findMany({
      where: {
        categoryId
      }
    })

    return schedule
  }

  async updateSchedule(data: UpdateScheduleDto): Promise<CategoryScheduleDto> {
    const schedule = await this.prisma.categorySchedule.update({
      where: {
        weekday_hour: {
          weekday: data.weekday,
          hour: data.hour
        }
      },
      data: {
        categoryId: data.categoryId
      }
    });

    return schedule;
  }
}
