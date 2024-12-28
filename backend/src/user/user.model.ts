/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

export interface FoodItem {
  itemName: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  foodItems: FoodItem[];
  totalAmount: number;
  orderDate: Date;
}

export interface Reservation {
  _id?: string; 
  branch: string;
  tableNumber: number;
  date: Date;
  time: string;
  numberOfGuests: number;
}


export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  orders: Order[]; // No readonly
  reservations: Reservation[]; // No readonly
}



export const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email
  phone: { type: String, required: true },
  orders: [
    {
      orderId: { type: String, required: true },
      foodItems: [
        {
          itemName: String,
          quantity: Number,
          price: Number,
        },
      ],
      totalAmount: Number,
      orderDate: { type: Date, default: Date.now },
    },
  ],
  reservations: [
    {
      branch: { type: String, required: true },
      tableNumber: Number,
      date: Date,
      time: String,
      numberOfGuests: Number,
    },
  ],
});


export const UserModel = model<User>('UserSchema', UserSchema);
