import { ConfigService } from '@nestjs/config';
import { Category } from 'src/modules/category/category';
import { ShopItem } from 'src/modules/shop-item/shop-item';
import { OrderItem } from 'src/modules/order-item/order-item';
import { Order } from 'src/modules/order/order';
import { Image } from 'src/modules/image/image';
import { User } from 'src/modules/user/user';

const getDBConfig = async (configService: ConfigService): Promise<any> => ({
  type: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: true,
  entities: [Category, ShopItem, OrderItem, Order, Image, User],
});

export default getDBConfig;
