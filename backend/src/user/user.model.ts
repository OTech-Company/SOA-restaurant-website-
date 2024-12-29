/* eslint-disable prettier/prettier */
import { Schema, Document, model } from 'mongoose';

// Define the User interface
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  cartData: Record<string, number>; // A dictionary with itemId as key and quantity as value
}

// Define the User schema
export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {}, minimize: false }, // Minimize: false ensures the object remains even when empty
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Export both the schema and the model
export const UserModel = model<User>('User', UserSchema);
