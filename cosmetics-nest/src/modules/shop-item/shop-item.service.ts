import { CreateShopItemDTO, ShopItem } from './shop-item';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CategoryService } from 'src/modules/category/category.service';
import { ImageService } from 'src/modules/image/image.service';

@Injectable()
export class ShopItemService {
  constructor(
    @InjectRepository(ShopItem)
    private readonly shopItemRepository: Repository<ShopItem>,
    private readonly categoryService: CategoryService,
    private readonly imageService: ImageService,
  ) {}
  async findById(id: number) {
    return await this.shopItemRepository.findOne({
      where: { id },
      relations: ['images', 'categories'],
    });
  }
  async findAll(title = '') {
    const [items, count] = await this.shopItemRepository.findAndCount({
      relations: ['images', 'categories'],
      ...(title && { where: { title: Like(`%${title}%`) } }),
    });

    return {
      items,
      count,
    };
  }

  async saveItems(shopItems: ShopItem[]) {
    return await this.shopItemRepository.save(shopItems);
  }

  async create(shopItem: Partial<CreateShopItemDTO>) {
    const { categories = [], images = [], ...rest } = shopItem;
    const shopItemEntity = {
      ...rest,
      categories: [],
      images: [],
    };

    await this.saveCategories(categories, shopItemEntity);
    await this.saveImages(images, shopItemEntity);

    return await this.shopItemRepository.save(shopItemEntity);
  }

  async update(shopItem: Partial<CreateShopItemDTO>) {
    const { categories = [], images = [], ...rest } = shopItem;
    const shopItemEntity = {
      ...rest,
      categories: [],
      images: [],
    };

    await this.saveCategories(categories, shopItemEntity);
    await this.saveImages(images, shopItemEntity);

    return await this.shopItemRepository.save(shopItemEntity);
  }

  async remove(id: string) {
    return await this.shopItemRepository.delete(id);
  }

  private async saveCategories(categories: string[], entity: any) {
    if (categories) {
      const categoriesEntity = await this.categoryService.saveCategories(
        categories,
      );
      categoriesEntity.map((item) => {
        entity?.categories.push(item);
      });
    }
    return entity;
  }

  private async saveImages(images: string[], entity: any) {
    if (images) {
      const imagesEntity = await this.imageService.saveImages(images);
      imagesEntity.map((item) => {
        entity?.images.push(item);
      });
    }
    return entity;
  }

  async getItemsByIds(ids: number[]) {
    return await this.shopItemRepository.find({
      where: { id: In(ids) },
    });
  }

  async getPrice(shopItems: any) {
    const ids = shopItems?.map((item) => item.id);
    const items = await this.shopItemRepository.find({
      where: { id: In(ids) },
    });
    let sum = 0;
    const response = [];
    items.forEach((item) => {
      shopItems.forEach((shopItem) => {
        if (shopItem.id === item.id) {
          response.push(buildItem(item, shopItem.count));
          sum += shopItem.count * item.price;
        }
      });
    });
    return { total: sum, items: response };
  }
}
function buildItem(item: ShopItem, count: number) {
  return {
    price: item.price,
    title: item.title,
    count,
    total: count * item.price,
    id: item.id,
  };
}
