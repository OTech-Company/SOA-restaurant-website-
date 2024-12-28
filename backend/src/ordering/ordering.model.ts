/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface FoodItem {
  foodId: string; // Reference to Food item
  itemName: string; // Name of the food item (enriched from FoodService)
  quantity: number; // Quantity ordered
  price: number; // Price of a single unit (enriched from FoodService)
}

export interface Order extends Document {
  orderId: string; // Unique identifier for the order
  userId: string; // Reference to User
  foodItems: FoodItem[]; // List of food items in the order
  totalAmount: number; // Total price for the order
  orderDate: Date; // Date the order was placed
}

export const OrderSchema = new Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  foodItems: [
    {
      foodId: { type: String, required: true },
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

export const OrderModel = model<Order>('Order', OrderSchema);
