/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { FoodService } from '../food/food.service'; // Import FoodService
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order', 'ordersDB') private readonly orderModel: Model<Order>,
    private readonly foodService: FoodService, // Integrate FoodService
  ) {}

  // Place an order
  async placeOrder(userId: string, orderData: { foodItems: { foodId: string; quantity: number }[] }): Promise<Order> {
    const enrichedFoodItems = [];
  
    for (const item of orderData.foodItems) {
      // Validate and fetch food details
      const food = await this.foodService.findById(item.foodId);
      if (!food ) {
        throw new BadRequestException(`Food item with ID "${item.foodId}" is not available.`);
      }
  
      // Enrich food item details
      enrichedFoodItems.push({
        foodId: food._id,
        itemName: food.name,
        quantity: item.quantity,
        price: food.price,
      });
    }
  
    // Calculate total amount
    const totalAmount = enrichedFoodItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  
    // Create and save the order
    const newOrder = new this.orderModel({
      orderId: uuidv4(),
      userId,
      foodItems: enrichedFoodItems,
      totalAmount,
      orderDate: new Date(),
    });
  
    return newOrder.save();
  }
  

  // Get a specific order by ID
  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ orderId }).exec();
    if (!order) throw new NotFoundException(`Order with ID "${orderId}" not found.`);
    return order;
  }

  // Get all orders for a user
  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  // Cancel an order
  async cancelOrder(orderId: string): Promise<void> {
    const result = await this.orderModel.findOneAndDelete({ orderId }).exec();
    if (!result) throw new NotFoundException(`Order with ID "${orderId}" not found.`);
  }
}