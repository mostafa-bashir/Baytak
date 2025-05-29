import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body('name') name: string) {
try {
      return await this.categoryService.create(name);
    } catch (error) {
      if (error.message.includes('exists')) {
        throw new BadRequestException('Category name already exists');
      }
      throw error;
    }  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }
}
