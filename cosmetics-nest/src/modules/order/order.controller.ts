import {
  Injectable,
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
} from '@nestjs/common';
import { OrderService } from 'src/modules/order/order.service';
import { CreateOrderDTO, Order } from 'src/modules/order/order';

@Injectable()
@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/')
  async getOrders(@Query('userId') userId: string) {
    return await this.orderService.findAll(userId);
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.findById(+id);
  }

  @Post('/')
  async createOrder(@Body() order: CreateOrderDTO) {
    return await this.orderService.create(order);
  }
}
