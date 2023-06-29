import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order';
import { ShopItem } from '../shop-item/shop-item';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: 0,
  })
  count: number;

  @ManyToOne(() => Order)
  order: Order;

  @ManyToOne(() => ShopItem)
  shopItem: ShopItem;
}
