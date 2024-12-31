/* eslint-disable prettier/prettier */
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { OrderSchema } from "./order.model";
import { FoodModule } from "../food/food.module"; // Import FoodModule

@Module({
  imports: [
    forwardRef(() => FoodModule),
    MongooseModule.forFeature(
      [{ name: "Order", schema: OrderSchema }],
      "ordersDB",
    ),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }

