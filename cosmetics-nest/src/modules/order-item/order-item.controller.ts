import { Injectable, Body, Controller, Get, Post, Param } from '@nestjs/common';
import { OrderItemService } from 'src/modules/order-item/order-item.service';
import { OrderItem } from 'src/modules/order-item/order-item';

@Injectable()
@Controller('/order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get('/')
  async getOrderItems() {
    return await this.orderItemService.findAll();
  }

  @Get('/:id')
  async getOrderItem(@Param('id') id: string) {
    return await this.orderItemService.findById(+id);
  }

  @Post('/')
  async createOrderItem(@Body() orderItem: Partial<OrderItem>) {
    return await this.orderItemService.create(orderItem);
  }
}
