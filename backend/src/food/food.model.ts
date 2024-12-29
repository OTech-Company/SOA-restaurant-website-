/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface Food extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // Path to the food image
}

export const FoodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});


export const FoodModel = model<Food>('Food', FoodSchema);