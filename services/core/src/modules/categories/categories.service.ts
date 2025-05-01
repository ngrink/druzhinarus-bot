import { Injectable } from '@nestjs/common';

import { CategoryDto } from '@/shared/generated/prisma/types/category.dto';
import { CategoryScheduleDto } from '@/shared/generated/prisma/types/categorySchedule.dto';
import { CreateCategoryDto, UpdateCategoryDto, UpdateScheduleDto } from '@/shared/dto/categories';

import { CategoriesRepository } from './categories.repository';


@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createCategory(data: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoriesRepository.createCategory(data)

    return category
  }

  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoriesRepository.getAllCategories()

    return categories
  }

  async getCategory(id: number): Promise<CategoryDto> {
    const category = await this.categoriesRepository.getCategory(id)

    return category
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoriesRepository.updateCategory(id, data)

    return category
  }

  async deleteCategory(id: number): Promise<CategoryDto> {
    const category = await this.categoriesRepository.deleteCategory(id)

    return category
  }

  async getSchedule(): Promise<CategoryScheduleDto[]> {
    const schedule = await this.categoriesRepository.getSchedule()

    return schedule
  }

  async getCategorySchedule(categoryId: number): Promise<CategoryScheduleDto[]> {
    const schedule = await this.categoriesRepository.getCategorySchedule(categoryId)

    return schedule
  }

  async updateSchedule(data: UpdateScheduleDto): Promise<CategoryScheduleDto> {
    const schedule = await this.categoriesRepository.updateSchedule(data)

    return schedule
  }
}
