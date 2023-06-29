import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, CreateCategoryDTO } from './category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async findById(id: number) {
    return await this.categoryRepository.findOne({
      where: { id },
    });
  }
  async findAll() {
    const [items, count] = await this.categoryRepository.findAndCount();
    return {
      items,
      count,
    };
  }

  async create(category: CreateCategoryDTO) {
    return await this.categoryRepository.save(category);
  }

  async saveCategories(categories: string[]) {
    const savedItems = await this.categoryRepository.find({
      where: { title: In(categories) },
    });
    const savedItemsTitle = savedItems.map((item) => item.title);
    const newItems = categories
      .filter((title) => !savedItemsTitle.includes(title))
      .flatMap((item) => item)
      .filter(Boolean)
      .map((item) => ({ title: item }));
    const savedUniqueItems = await this.categoryRepository.save(newItems);
    return [...savedUniqueItems, ...savedItems];
  }
}
