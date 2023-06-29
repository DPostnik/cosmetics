import { Module } from '@nestjs/common';
import { CategoryController } from 'src/modules/category/category.contoller';
import { CategoryService } from 'src/modules/category/category.service';
import { ImageController } from 'src/modules/image/image.controller';
import { ImageService } from 'src/modules/image/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/modules/category/category';
import { Image } from 'src/modules/image/image';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [TypeOrmModule.forFeature([Image])],
  exports: [ImageService],
})
export class ImageModule {}
