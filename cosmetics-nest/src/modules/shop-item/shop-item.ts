import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from '../image/image';
import { Category } from 'src/modules/category/category';

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
    default: 0,
  })
  count: number;

  @Column({
    nullable: false,
    default: 0,
  })
  volume: number;

  @Column({
    nullable: false,
    default: 0,
  })
  views: number;

  @Column({
    nullable: false,
    default: 0,
  })
  rating: number;

  @ManyToMany(() => Image)
  @JoinTable()
  images: Image[];

  @Column({
    nullable: false,
    default: true,
  })
  isEnabled: boolean;

  @ManyToMany(() => ShopItem)
  @JoinTable()
  shopItems: ShopItem[];

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

export class CreateShopItemDTO {
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly volume: number;
  readonly images: string[];
  readonly categories: string[];
}
