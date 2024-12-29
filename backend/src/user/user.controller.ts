/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwtAuthGuard';
import { UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Get('profile')
  @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
  async getProfile(@Request() req) {
    return this.userService.findOne(req.user.id); // Get the user from JWT payload
  }
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
}
