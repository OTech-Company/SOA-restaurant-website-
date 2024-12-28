/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config();
@Module({
  imports: [
    // Database connections
    MongooseModule.forRoot(process.env.usersDB, { connectionName: 'usersDB' }),
    // MongooseModule.forRoot(process.env.DB, { connectionName: 'moviesDB' }),
    
    // Modules
    UsersModule, // Assuming UserModule connects to 'usersDB'
    // MovieModule, // MovieModule connects to 'moviesDB'
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
