/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv'; // Import dotenv
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { FoodModule } from './food/food.module'; // Import FoodModule
import { OrderModule } from './ordering/ordering.module';
import { ReservationModule } from './reservation/reservation.module';
import { UserModule } from './user/user.module';
dotenv.config();

@Module({
  imports: [
    // Database connections
    MongooseModule.forRoot(process.env.usersDB, { connectionName: 'usersDB' }),
    MongooseModule.forRoot(process.env.foodDB, { connectionName: 'foodDB' }),
    MongooseModule.forRoot(process.env.ordersDB, { connectionName: 'ordersDB' }),
    MongooseModule.forRoot(process.env.reservationsDB, { connectionName: 'reservationsDB' }),
    MongooseModule.forRoot(process.env.AuthDB, { connectionName: 'DB_URI' }),
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
