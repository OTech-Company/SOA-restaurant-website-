/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  // Add a new food item with an image
  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async addFood(
    @Body() body: { name: string; description: string; price: number; category: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Uploaded File:', file); // Debug log to check filename
    const data = { ...body, image: file.filename };
    return this.foodService.create(data);
  }
  

  // List all food items
  @Get('list')
  async listFood() {
    const foods = await this.foodService.findAll();
    console.log('Foods:', foods); // Debug log
    return { success: true, data: foods };
  }
  

  @Delete('remove/:id') // Matches /food/remove/:id
  async removeFood(@Param('id') id: string) {
    await this.foodService.deleteWithImage(id); // Call deleteWithImage
    return { success: true, message: 'Food item removed successfully, along with its image.' };
  }
}
