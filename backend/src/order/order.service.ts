/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order', 'ordersDB') private readonly orderModel: Model<Order>,
  ) {}

  async placeOrder(data: {
    userId: string;
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
  }): Promise<{ success: boolean; message: string; order: Order }> {
    const simplifiedAddress = {
      street: data.address.street,
      city: data.address.city,
      state: data.address.state,
      country: data.address.country,
      zipcode: data.address.zipcode,
      phone: data.address.phone,
      firstName: data.address.firstName,
      lastName: data.address.lastName,
      email: data.address.email,
    };

    const newOrder = new this.orderModel({
      userId: data.userId,
      address: simplifiedAddress,
      items: data.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      amount: data.amount,
    });

    const savedOrder = await newOrder.save();

    return {
      success: true,
      message: 'Order placed successfully',
      order: savedOrder,
    };
  }

  async verifyOrder(
    orderId: string,
    success: boolean,
  ): Promise<{ success: boolean; message: string }> {
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
      return {
        success: false,
        message: 'Order verification failed and deleted',
      };
    }
  }

  async userOrders(userId: string): Promise<{ success: boolean; data: Order[] }> {
    const orders = await this.orderModel.find({ userId }).exec();
    return { success: true, data: orders };
  }

  async listOrders(): Promise<{ success: boolean; data: Order[] }> {
    const orders = await this.orderModel.find().exec();
    return { success: true, data: orders };
  }

  async updateStatus(
    orderId: string,
    status: string,
  ): Promise<{ success: boolean; message: string }> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;
    await order.save();
    return { success: true, message: 'Order status updated successfully' };
  }
}
