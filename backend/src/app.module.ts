/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FoodModule } from './food/food.module'; // Import FoodModule
import { ReservationModule } from './reservation/reservation.module';
import { OrderModule } from './ordering/ordering.module';
import * as dotenv from 'dotenv'; // Import dotenv
import { AuthModule } from './auth/auth.module'; // Import AuthModule
dotenv.config();

@Module({
  imports: [
    // Database connections
    MongooseModule.forRoot(process.env.usersDB, { connectionName: 'usersDB' }),
    MongooseModule.forRoot(process.env.foodDB, { connectionName: 'foodDB' }),
    MongooseModule.forRoot(process.env.ordersDB, { connectionName: 'ordersDB' }),
    MongooseModule.forRoot(process.env.reservationsDB, { connectionName: 'reservationsDB' }),
    
    // Feature modules
    UserModule,
    FoodModule, 
    OrderModule,
    ReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService], // Remove any other service from here
})
export class AppModule {}
