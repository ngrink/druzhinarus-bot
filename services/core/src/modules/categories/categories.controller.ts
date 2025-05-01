import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { CategoryDto } from '@/shared/generated/prisma/types/category.dto';
import { CategoryScheduleDto } from '@/shared/generated/prisma/types/categorySchedule.dto';
import { CreateCategoryDto, UpdateCategoryDto, UpdateScheduleDto } from '@/shared/dto/categories';

import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
  * Create a new category
  */
  @Post()
  @ApiBody({type: CreateCategoryDto, required: true})
  @ApiCreatedResponse({type: CategoryDto, description: 'Category data'})
  createCategory(@Body() data: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoriesService.createCategory(data);
  }

  /**
  * Get all categories
  */
  @Get()
  @ApiOkResponse({type: [CategoryDto], description: 'List of categories'})
  getAllCategories(): Promise<CategoryDto[]> {
    return this.categoriesService.getAllCategories()
  }

  /**
  * Get schedule
  */
  @Get("schedule")
  @ApiOkResponse({type: [CategoryScheduleDto]})
  getSchedule(): Promise<CategoryScheduleDto[]> {
    return this.categoriesService.getSchedule()
  }

  /**
  * Get category schedule
  */
  @Get(":id/schedule")
  @ApiParam({ name: "id", type: "number" })
  @ApiOkResponse({type: [CategoryScheduleDto]})
  getCategorySchedule(
    @Param("id") id: number
  ): Promise<CategoryScheduleDto[]> {
    return this.categoriesService.getCategorySchedule(id)
  }

  /**
  * Update schedule
  */
  @Patch("schedule")
  @ApiBody({type: UpdateScheduleDto})
  @ApiOkResponse({type: CategoryScheduleDto, description: 'Updated schedule'})
  updateSchedule(
    @Body() data: UpdateScheduleDto,
  ): Promise<CategoryScheduleDto> {
    return this.categoriesService.updateSchedule(data)
  }


  /**
  * Get category
  */
  @Get(":id")
  @ApiParam({ name: "id", type: "number" })
  @ApiOkResponse({type: CategoryDto, description: 'Category data'})
  getCategory(
    @Param("id") id: number,
  ): Promise<CategoryDto> {
    return this.categoriesService.getCategory(id)
  }

  /**
  * Update category
  */
  @Patch(":id")
  @ApiParam({ name: "id", type: "number" })
  @ApiOkResponse({type: CategoryDto, description: 'Category data'})
  updateCategory(
    @Param("id") id: number,
    @Body() data: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.updateCategory(id, data)
  }

  /**
  * Delete category
  */
  @Delete(":id")
  @ApiParam({ name: "id", type: "number" })
  @ApiOkResponse()
  deleteCategory(
    @Param("id") id: number,
  ): Promise<CategoryDto> {
    return this.categoriesService.deleteCategory(id)
  }
}
