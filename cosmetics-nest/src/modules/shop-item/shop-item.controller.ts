import { CreateShopItemDTO } from './shop-item';
import { ShopItemService } from './shop-item.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Injectable()
@Controller('/shop-item')
export class ShopItemController {
  constructor(private shopItemService: ShopItemService) {}
  @Get('/')
  async getShopItems(@Query('title') title = '') {
    return await this.shopItemService.findAll(title);
  }

  @Get('/:id')
  async getShopItem(@Param('id') id: string) {
    return await this.shopItemService.findById(+id);
  }

  @Post('/price')
  async getShopItemPrice(@Body('items') items: any) {
    return await this.shopItemService.getPrice(items);
  }

  @Post('/')
  async createShopItem(@Body() shopItem: Partial<CreateShopItemDTO>) {
    return await this.shopItemService.create(shopItem);
  }

  @Delete(`/:id`)
  async removeShopItem(@Param('id') id: string) {
    return await this.shopItemService.remove(id);
  }

  @Put('')
  async updateShopItem(@Body() shopItem: Partial<CreateShopItemDTO>) {
    return await this.shopItemService.update(shopItem);
  }
}
