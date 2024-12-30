/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Place an order
  @Post('place')
  async placeOrder(@Body() body: {
    userId: string;
    items: Array<{ name: string; price: number; quantity: number }>;
    amount: number;
    address: Record<string, any>;
  }) {
    return this.orderService.placeOrder(body);
  }

  // Verify an order payment
  @Post('verify')
  async verifyOrder(@Body() body: { orderId: string; success: boolean }) {
    const { orderId, success } = body;
    return this.orderService.verifyOrder(orderId, success);
  }

  // Get user-specific orders
  @Post('userorders')
  async userOrders(@Body() body: { userId: string }) {
    return this.orderService.userOrders(body.userId);
  }

  // List all orders (admin panel)
  @Get('list')
  async listOrders() {
    return this.orderService.listOrders();
  }

  // Update order status
  @Post('status')
  async updateStatus(@Body() body: { orderId: string; status: string }) {
    const { orderId, status } = body;
    return this.orderService.updateStatus(orderId, status);
  }
}
