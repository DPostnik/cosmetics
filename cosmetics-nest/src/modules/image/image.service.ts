import { CreateImageDTO, Image } from './image';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}
  async findById(id: number) {
    return await this.imageRepository.findOne({
      where: { id },
    });
  }
  async findAll() {
    const [items, count] = await this.imageRepository.findAndCount();
    return {
      items,
      count,
    };
  }

  async create(image: CreateImageDTO) {
    return await this.imageRepository.save(image);
  }

  async saveImages(images: string[]) {
    const savedItems = await this.imageRepository.find({
      where: { url: In(images) },
    });
    const savedItemsUrl = savedItems.map((item) => item.url);
    const newItems = images
      .filter((url) => !savedItemsUrl.includes(url))
      .flatMap((item) => item)
      .filter(Boolean)
      .map((item) => ({ url: item }));
    const savedUniqueItems = await this.imageRepository.save(newItems);
    return [...savedUniqueItems, ...savedItems];
  }
}
