/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }], 'usersDB'),
    forwardRef(() => OrderModule)
  ],
  controllers: [UserController],
  providers: [UserService] ,
  exports: [UserService], // Export UserService to make it available for other modules
})
export class UserModule {}
