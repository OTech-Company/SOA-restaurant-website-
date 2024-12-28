/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodSchema } from './food.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Food', schema: FoodSchema }],
      'foodDB', // Connection name
    ),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
