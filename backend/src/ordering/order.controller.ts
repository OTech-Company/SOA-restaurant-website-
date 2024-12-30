/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Place an order
  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async placeOrder(
    @Param('userId') userId: string,
    @Body() orderData: { foodItems: { foodId: string; quantity: number }[] },
  ) {
    return this.orderService.placeOrder(userId, orderData);
  }

  // Get a specific order by orderId
  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOrder(orderId);
  }

  // Get all orders for a user
  @Get('user/:userId')
  async getUserOrders(@Param('userId') userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  // Cancel an order
  @Delete(':orderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelOrder(@Param('orderId') orderId: string) {
    return this.orderService.cancelOrder(orderId);
  }
}