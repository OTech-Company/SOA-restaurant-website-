/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Post()
  async createUser(@Body() body: { firstname: string; lastname: string; email: string; phone: string }) {
    return this.userService.createUser(body);
  }

  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(userId, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  // Add an item to the user's cart
  @Post('cart/add')
  async addToCart(
    @Body() body: { userId: string; itemId: string },
  ): Promise<{ success: boolean; message: string }> {
    const { userId, itemId } = body;
    return this.userService.addToCart(userId, itemId);
  }

  // Remove an item from the user's cart
  @Post('cart/remove')
  async removeFromCart(
    @Body() body: { userId: string; itemId: string },
  ): Promise<{ success: boolean; message: string }> {
    const { userId, itemId } = body;
    return this.userService.removeFromCart(userId, itemId);
  }

  // Fetch the user's cart data
  @Get('cart')
  async getCart(
    @Body() body: { userId: string },
  ): Promise<{ success: boolean; cartData: Record<string, number> }> {
    const { userId } = body;
    return this.userService.getCart(userId);
  }
}
