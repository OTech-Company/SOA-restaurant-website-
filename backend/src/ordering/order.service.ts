/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>, 
    
  ) {
    console.log('OrderService initialized with orderModel:', this.orderModel);

  }

  // Place a new order
  async placeOrder(data: {
    userId: string;
    items: Array<{ name: string; price: number; quantity: number }>;
    amount: number;
    address: Record<string, any>;
  }): Promise<{ success: boolean; message: string }> {
    const newOrder = new this.orderModel(data);
    await newOrder.save();
    return { success: true, message: 'Order placed successfully' };
  }

  // Verify an order payment
  async verifyOrder(orderId: string, success: boolean): Promise<{ success: boolean; message: string }> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (success) {
      order.payment = true;
      await order.save();
      return { success: true, message: 'Order verified and paid' };
    } else {
      await this.orderModel.findByIdAndDelete(orderId);
      return { success: false, message: 'Order verification failed and deleted' };
    }
  }

  // Get orders for a user
  async userOrders(userId: string): Promise<{ success: boolean; data: Order[] }> {
    const orders = await this.orderModel.find({ userId }).exec();
    return { success: true, data: orders };
  }

  // List all orders (admin panel)
  async listOrders(): Promise<{ success: boolean; data: Order[] }> {
    const orders = await this.orderModel.find().exec();
    return { success: true, data: orders };
  }

  // Update order status
  async updateStatus(orderId: string, status: string): Promise<{ success: boolean; message: string }> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;
    await order.save();
    return { success: true, message: 'Order status updated successfully' };
  }
}
