/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User', 'usersDB') private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(data: { firstname: string; lastname: string; email: string; phone: string }): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    if (!result) throw new NotFoundException('User not found');
  }

  // Add an item to the user's cart
  async addToCart(userId: string, itemId: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const cartData = user.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await this.userModel.findByIdAndUpdate(userId, { cartData });
    return { success: true, message: 'Added to cart' };
  }

  // Remove an item from the user's cart
  async removeFromCart(userId: string, itemId: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const cartData = user.cartData || {};
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId]; // Remove the item completely if quantity is 0 or less
      }
    }

    await this.userModel.findByIdAndUpdate(userId, { cartData });
    return { success: true, message: 'Removed from cart' };
  }

  // Fetch the user's cart data
  async getCart(userId: string): Promise<{ success: boolean; cartData: Record<string, number> }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const cartData = user.cartData || {};
    return { success: true, cartData };
  }

}
