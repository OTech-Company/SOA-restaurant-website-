/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { FoodSchema } from './food.model';
import { OrderModule } from '../ordering/ordering.module';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Food', schema: FoodSchema }],
      'foodDB', // Connection name
    ),
    OrderModule,
    ReservationModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService], // Export FoodService for use in other modules
})
export class FoodModule {}
