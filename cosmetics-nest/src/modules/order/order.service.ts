import { CreateOrderDTO, Order } from './order';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopItemService } from 'src/modules/shop-item/shop-item.service';
import { UserService } from 'src/modules/user/user.service';
import { OrderItemService } from 'src/modules/order-item/order-item.service';
import { ShopItem } from 'src/modules/shop-item/shop-item';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly shopItemService: ShopItemService,
    private readonly userService: UserService,
    private readonly orderItemService: OrderItemService,
  ) {}
  async findById(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
    });
  }
  async findAll(userId: string) {
    const [items, count] = await this.orderRepository.findAndCount({
      where: {
        user: { id: +userId },
      },
      relations: ['orderItems', 'orderItems.shopItem'],
    });

    return {
      items: parseOrderResponse(items),
      count,
    };
  }

  getSum(shopItems: ShopItem[], cart: CreateOrderDTO) {
    let sum = 0;
    shopItems.forEach((item) => {
      cart.shopItems.forEach(({ id, count }) => {
        if (id === item.id) {
          sum += count * item.price;
        }
      });
    });
    return sum;
  }

  convertCartToOrderItems(
    shopItems: ShopItem[],
    cart: CreateOrderDTO,
    order: Order,
  ) {
    const entities: OrderItemDTO[] = [];

    cart.shopItems.forEach((item) => {
      shopItems.forEach((shopItem) => {
        if (shopItem.id === item.id) {
          entities.push({ shopItem, count: item.count, order });
        }
      });
    });
    return entities;
  }

  updateShopItemsAmount(shopItems: ShopItem[], orderDTO: CreateOrderDTO) {
    const updatedShopItems: ShopItem[] = shopItems.map((shopItem) => {
      let newShopItem: any;
      orderDTO.shopItems.forEach((item) => {
        if (item.id === shopItem.id) {
          newShopItem = {
            ...shopItem,
            count: shopItem.count - item.count,
          };
          return;
        }
      });
      return newShopItem;
    });

    this.shopItemService.saveItems(updatedShopItems);
  }

  async create(orderDTO: CreateOrderDTO) {
    const ids = orderDTO.shopItems.map((item) => item.id);
    const shopItems = await this.shopItemService.getItemsByIds(ids);

    const user = await this.userService.findById(1);
    const sum = this.getSum(shopItems, orderDTO);

    await this.updateShopItemsAmount(shopItems, orderDTO);

    const order = await this.orderRepository.save([
      {
        price: sum,
        created_at: new Date(),
        user,
      },
    ]);

    const orderItemsDTO = this.convertCartToOrderItems(
      shopItems,
      orderDTO,
      order[0],
    );

    await this.orderItemService.createMultiple(orderItemsDTO);

    return null;
  }
}

export class OrderItemDTO {
  shopItem: ShopItem;
  order: Order;
  count: number;
}

function parseOrderResponse(orders: Order[]) {
  return orders.map((order) => {
    const orderItems = order.orderItems.map((orderItem) => {
      return {
        count: orderItem.count,
        price: orderItem.shopItem.price,
        title: orderItem.shopItem.title,
        total: orderItem.shopItem.price * orderItem.count,
      };
    });

    return {
      id: order.id,
      orderItems,
      price: order.price,
      date: order.created_at,
    };
  });
}
