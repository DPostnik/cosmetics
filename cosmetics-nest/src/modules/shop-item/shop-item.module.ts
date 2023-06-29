import { Module } from '@nestjs/common';
import { ShopItemController } from 'src/modules/shop-item/shop-item.controller';
import { ShopItemService } from 'src/modules/shop-item/shop-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from 'src/modules/shop-item/shop-item';
import { CategoryModule } from 'src/modules/category/category.module';
import { ImageModule } from 'src/modules/image/image.module';
import { Category } from 'src/modules/category/category';
import { Image } from 'src/modules/image/image';

@Module({
  controllers: [ShopItemController],
  providers: [ShopItemService],
  imports: [
    TypeOrmModule.forFeature([ShopItem, Category, Image]),
    CategoryModule,
    ImageModule,
  ],
  exports: [ShopItemService],
})
export class ShopItemModule {}
