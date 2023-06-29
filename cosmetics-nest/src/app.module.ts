import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import getDBConfig from 'src/config/db.config';
import { CategoryModule } from 'src/modules/category/category.module';
import { ImageModule } from 'src/modules/image/image.module';
import { OrderModule } from 'src/modules/order/order.module';
import { OrderItemModule } from 'src/modules/order-item/order-item.module';
import { ShopItemModule } from 'src/modules/shop-item/shop-item.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDBConfig,
      inject: [ConfigService],
    }),
    CategoryModule,
    ImageModule,
    OrderModule,
    OrderItemModule,
    ShopItemModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
