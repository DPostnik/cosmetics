import { OrderItem } from './order-item';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { OrderItemDTO } from 'src/modules/order/order.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}
  async findById(id: number) {
    return await this.orderItemRepository.findOne({
      where: { id },
    });
  }

  async findByOrderIds(ids: number[]) {
    return await this.orderItemRepository.find({
      where: { order: { id: In(ids) } },
      relations: ['order'],
    });
  }
  async findAll() {
    return await this.orderItemRepository.findAndCount();
  }

  async create(orderItem: Partial<OrderItem>) {
    return await this.orderItemRepository.save(orderItem);
  }

  createMultiple(items: OrderItemDTO[]) {
    return this.orderItemRepository.save(items);
  }
}
