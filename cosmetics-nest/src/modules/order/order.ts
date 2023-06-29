import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../order-item/order-item';
import { User } from 'src/modules/user/user';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  price: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}

export class CreateOrderDTO {
  shopItems: { id: number; count: number }[];
}
