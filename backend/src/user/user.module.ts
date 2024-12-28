import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'User', schema: UserSchema }],
      'usersDB', // Connection name
    ),
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
