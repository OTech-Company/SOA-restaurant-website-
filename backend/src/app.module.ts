/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { FoodModule } from './food/food.module'; // Import FoodModule
import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config();

@Module({
  imports: [
    // Database connections
    MongooseModule.forRoot(process.env.usersDB, { connectionName: 'usersDB' }),
    MongooseModule.forRoot(process.env.foodDB, { connectionName: 'foodDB' }),
    
    // Feature modules
    UsersModule,
    FoodModule, 
  ],
  controllers: [AppController],
  providers: [AppService], // Remove any other service from here
})
export class AppModule {}
