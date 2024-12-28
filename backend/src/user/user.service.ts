/* eslint-disable prettier/prettier */


import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User', 'usersDB') private readonly userModel: Model<User>, // Specify the connection name
  ) {}

  // Get all users
  async findAll(): Promise<any[]> {
    return this.userModel.find().exec();
  }

  // Get a single user by ID
  async findOne(userId: string): Promise<any> {
    return this.userModel.findById(userId).exec();
  }

  // Create a new user
  async createUser(data: { firstname: string; lastname: string; email: string; phone: string }): Promise<any> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  // Update user details
  async updateUser(userId: string, updateData: Partial<{ firstname: string; lastname: string; email: string; phone: string }>): Promise<any> {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  }

  // Delete a user
  async deleteUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  // Place a food order
  async placeOrder(userId: string, orderData: { foodItems: any[]; totalAmount: number }): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error('User not found');

    const orderId = uuidv4();
    const newOrder = {
      orderId,
      ...orderData,
      orderDate: new Date(),
    };

    user.orders.push(newOrder); // Use push instead of reassigning
    return user.save();
  }

  // Get a specific order by orderId
  async getOrder(userId: string, orderId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    return user?.orders.find(order => order.orderId === orderId);
  }

  // Update an order
  async updateOrder(userId: string, orderId: string, updateData: Partial<{ foodItems: any[]; totalAmount: number }>): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return null;

    const updatedOrders = user.orders.map(order =>
      order.orderId === orderId ? { ...order, ...updateData } : order,
    );

    user.orders = updatedOrders;
    return user.save();
  }

  // Cancel an order
  async cancelOrder(userId: string, orderId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return null;

    user.orders = user.orders.filter(order => order.orderId !== orderId);
    return user.save();
  }

  async reserveTable(userId: string, reservationData: { branch: string; tableNumber: number; date: Date; time: string; numberOfGuests: number }): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new Error('User not found');

    user.reservations.push(reservationData); // Use push instead of reassigning
    return user.save();
  }

  // Get a specific reservation
  async getReservation(userId: string, reservationId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    return user?.reservations.find(reservation => reservation._id.toString() === reservationId);
  }

  // Update a reservation
  async updateReservation(
    userId: string,
    reservationId: string,
    updateData: Partial<{ tableNumber: number; date: Date; time: string; numberOfGuests: number }>,
  ): Promise<any> {
    // Validate the reservation ID
    if (!isValidObjectId(reservationId)) {
      throw new BadRequestException('Invalid reservation ID');
    }
  
    // Use MongoDB's $set operator to update the specific reservation
    const result = await this.userModel.updateOne(
      { _id: userId, 'reservations._id': reservationId }, // Match user ID and nested reservation ID
      { $set: { 'reservations.$': updateData } }, // Update the matching reservation
    ).exec();
  
    // Check if any document was modified
    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Reservation with ID ${reservationId} not found`);
    }
  
    // Return the updated user document
    return this.userModel.findById(userId).exec();
  }
  
  // Cancel a reservation
  async cancelReservation(userId: string, reservationId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return null;

    user.reservations = user.reservations.filter(reservation => reservation._id.toString() !== reservationId);
    return user.save();
  }
}