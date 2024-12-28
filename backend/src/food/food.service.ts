/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Food } from './food.model';

@Injectable()
export class FoodService {

  constructor(
    @InjectModel('Food', 'foodDB') // Specify the schema name and connection
    private readonly foodModel: Model<Food>,
  ) {
    console.log('FoodService initialized with foodModel');
  }


  // Get all food items
  async findAll(): Promise<Food[]> {
    return this.foodModel.find().exec();
  }

  // Get a single food item by ID
  async findOne(id: string): Promise<Food> {
    const food = await this.foodModel.findById(id).exec();
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  async findById(id: string): Promise<Food> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid food ID: ${id}`);
    }
    const food = await this.foodModel.findById(id).exec();
    if (!food) {
      throw new NotFoundException(`Food item with ID "${id}" not found.`);
    }
    return food;
  }
  
  // Create a new food item
  async create(data: { name: string; description: string; price: number; category: string }): Promise<Food> {
    const newFood = new this.foodModel(data);
    return newFood.save();
  }

  // Update a food item
  async update(id: string, updateData: Partial<{ name: string; description: string; price: number; category: string; isAvailable: boolean }>): Promise<Food> {
    const updatedFood = await this.foodModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedFood) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return updatedFood;
  }

  // Delete a food item
  async delete(id: string): Promise<void> {
    const result = await this.foodModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
  }
}
