/* eslint-disable prettier/prettier */
import { Schema, Document, model, Types } from 'mongoose';

export interface User extends Document {
  _id: Types.ObjectId; // or 'string' if you're converting ObjectId to a string
  name: string;
  email: string;
  password: string;
  cartData: Record<string, number>;
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {}, minimize: false },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<User>('User', UserSchema);
