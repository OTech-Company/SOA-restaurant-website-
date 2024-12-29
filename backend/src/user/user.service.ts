/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as validator from 'validator';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User', 'usersDB') private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  
  async findOne(userId: string): Promise<User> {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async createUser(data: { firstname: string; lastname: string; email: string; phone: string }): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
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

    // Create a JWT token
    private createToken(userId: string): string {
      return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }
  
    // Login User
    async loginUser(email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException("User doesn't exist.");
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials.');
      }
    
      const token = this.createToken(user._id.toString());
      return { success: true, token };
    }
    
    // Register User
    async registerUser(name: string, email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
      // Check if user already exists
      const exists = await this.userModel.findOne({ email });
      if (exists) {
        return { success: false, message: 'User already exists.' };
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return { success: false, message: 'Please enter a valid email.' };
      }
  
      // Validate password strength
      if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
        throw new BadRequestException('Password must be at least 8 characters long with 1 symbol.');
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      const token = this.createToken(user._id.toString());
      return { success: true, token };
    }
}
