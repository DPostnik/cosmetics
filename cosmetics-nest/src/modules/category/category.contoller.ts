import { Injectable, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, CreateCategoryDTO } from './category';

@Injectable()
@Controller('/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async getCategories() {
    return await this.categoryService.findAll();
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    return await this.categoryService.findById(+id);
  }

  @Post('/')
  async createCategory(@Body() category: CreateCategoryDTO) {
    return await this.categoryService.create(category);
  }
}
