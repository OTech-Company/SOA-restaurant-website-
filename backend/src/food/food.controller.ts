/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // Get all food items
  @Get()
  async findAll() {
    return this.foodService.findAll();
  }

  // Get a single food item by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  // Create a new food item
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFoodDto: { name: string; description: string; price: number; category: string }) {
    return this.foodService.create(createFoodDto);
  }

  // Update a food item
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFoodDto: Partial<{ name: string; description: string; price: number; category: string; isAvailable: boolean }>,
  ) {
    return this.foodService.update(id, updateFoodDto);
  }

  // Delete a food item
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.foodService.delete(id);
  }
}
