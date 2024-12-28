/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Food extends Document {
  name: string;
  description: string;
  price: number;
  category: string; // e.g., Appetizer, Main Course, Dessert, etc.
  isAvailable: boolean;
}

export const FoodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

export const FoodModel = model<Food>('Food', FoodSchema);