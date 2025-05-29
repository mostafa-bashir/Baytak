import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(name: string): Promise<Category> {
  const normalized = name.trim().toLowerCase();

  const existing = await this.categoryRepository.findOne({
    where: { name: normalized },
  });

  if (existing) {
    throw new Error('Category name already exists');
  }

  const category = this.categoryRepository.create({ name: normalized });
  return this.categoryRepository.save(category);
}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
