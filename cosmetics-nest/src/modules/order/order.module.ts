import { Module } from '@nestjs/common';
import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/modules/order/order';
import { ShopItemModule } from 'src/modules/shop-item/shop-item.module';
import { UserModule } from 'src/modules/user/user.module';
import { OrderItemModule } from 'src/modules/order-item/order-item.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order]),
    ShopItemModule,
    UserModule,
    OrderItemModule,
  ],
  exports: [],
})
export class OrderModule {}
