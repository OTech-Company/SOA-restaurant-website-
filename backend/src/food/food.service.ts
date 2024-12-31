/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { Food } from "./food.model";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FoodService {
  constructor(
    @InjectModel("Food", "foodDB") private readonly foodModel: Model<Food>,
  ) { }

  //findbyid
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

  // Get all food items
  async findAll(): Promise<Food[]> {
    return this.foodModel.find().exec();
  }

  // Create a new food item
  async create(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }): Promise<Food> {
    const newFood = new this.foodModel(data);
    return newFood.save();
  }

  async deleteWithImage(id: string): Promise<void> {
    const food = await this.foodModel.findById(id).lean<Food>().exec(); // Use lean to get plain object
    if (!food) {
      throw new NotFoundException(`Food item with ID "${id}" not found.`);
    }

    // Delete the image file
    const imagePath = path.join(__dirname, "../../uploads", food.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await this.foodModel.findByIdAndDelete(id).exec();
  }
}
