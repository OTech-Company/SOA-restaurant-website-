/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place')
  async placeOrder(
    @Headers('token') token: string,
    @Body()
    body: {
      address: {
        firstName: string;
        lastName: string;
        email: string;
        street: string;
        city: string;
        state: string;
        country: string;
        zipcode: string;
        phone: string;
      };
      items: Array<{
        _id: string;
        name: string;
        description: string;
        category: string;
        price: number;
        quantity: number;
      }>;
      amount: number;
    },
  ) {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      if (!decoded || !decoded.id) {
        throw new Error();
      }
      userId = decoded.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const { address, items, amount } = body;

    if (
      !address ||
      !address.firstName ||
      !address.lastName ||
      !address.email ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.zipcode ||
      !address.phone ||
      !items ||
      !amount
    ) {
      throw new BadRequestException(
        'Missing required fields: address (with all its properties), items, or amount',
      );
    }

    const result = await this.orderService.placeOrder({
      userId,
      address,
      items,
      amount,
    });

    return result;
  }

  @Post('verify')
  async verifyOrder(@Body() body: { orderId: string; success: boolean }) {
    const { orderId, success } = body;
    return this.orderService.verifyOrder(orderId, success);
  }

  @Post('userorders')
  async userOrders(@Headers('token') token: string) {
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    let userId: string;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      if (!decoded || !decoded.id) {
        throw new Error();
      }
      userId = decoded.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.orderService.userOrders(userId);
  }

  @Post('status')
  async updateStatus(@Body() body: { orderId: string; status: string }) {
    const { orderId, status } = body;
    return this.orderService.updateStatus(orderId, status);
  }

  @Get('list')
  async listOrders() {
    return this.orderService.listOrders();
  }
}
