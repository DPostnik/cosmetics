import { Module } from '@nestjs/common';
import { OrderItemController } from 'src/modules/order-item/order-item.controller';
import { OrderItemService } from 'src/modules/order-item/order-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/modules/order-item/order-item';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
  exports: [OrderItemService],
})
export class OrderItemModule {}
