/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from './order.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }], 'ordersDB'), // 'ordersDB' matches the connection name
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
