/* eslint-disable prettier/prettier */
import { Document, model, Schema } from "mongoose";

export interface Order extends Document {
  userId: string;
  items: Array<{ name: string; price: number; quantity: number }>;
  amount: number;
  address: Record<string, any>;
  status: string;
  date: Date;
  payment: boolean;
}

export const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

export const OrderModel = model<Order>("Order", OrderSchema);

