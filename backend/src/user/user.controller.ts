/* eslint-disable prettier/prettier */

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { UsersService } from './user.service';
  //import { User } from './user.model';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UsersService) {}
   
    // Get all users
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // Get a single user by ID
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  // Create a new user
  @Post()
  async createUser(@Body() body: { firstname: string; lastname: string; email: string; phone: string }) {
    return this.userService.createUser(body);
  }

  // Update user details
  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateData: Partial<{ firstname: string; lastname: string; email: string; phone: string }>) {
    return this.userService.updateUser(userId, updateData);
  }

  // Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }

  // Place a food order
  @Post(':id/orders')
  async placeOrder(@Param('id') userId: string, @Body() orderData: { foodItems: any[]; totalAmount: number }) {
    return this.userService.placeOrder(userId, orderData);
  }

  // Get a specific order by orderId
  @Get(':id/orders/:orderId')
  async getOrder(@Param('id') userId: string, @Param('orderId') orderId: string) {
    return this.userService.getOrder(userId, orderId);
  }

  // Update an order
  @Put(':id/orders/:orderId')
  async updateOrder(
    @Param('id') userId: string,
    @Param('orderId') orderId: string,
    @Body() updateData: Partial<{ foodItems: any[]; totalAmount: number }>,
  ) {
    return this.userService.updateOrder(userId, orderId, updateData);
  }

  // Cancel an order
  @Delete(':id/orders/:orderId')
  async cancelOrder(@Param('id') userId: string, @Param('orderId') orderId: string) {
    return this.userService.cancelOrder(userId, orderId);
  }

  // Reserve a table
  @Post(':id/reservations')
  async reserveTable(
    @Param('id') userId: string,
    @Body() reservationData: { branch: string; tableNumber: number; date: Date; time: string; numberOfGuests: number },
  ) {
    return this.userService.reserveTable(userId, reservationData);
  }

  // Get a specific reservation
  @Get(':id/reservations/:reservationId')
  async getReservation(@Param('id') userId: string, @Param('reservationId') reservationId: string) {
    return this.userService.getReservation(userId, reservationId);
  }

  // Update a reservation
  @Put(':id/reservations/:reservationId')
  async updateReservation(
    @Param('id') userId: string,
    @Param('reservationId') reservationId: string,
    @Body() updateData: Partial<{ tableNumber: number; date: Date; time: string; numberOfGuests: number }>,
  ) {
    return this.userService.updateReservation(userId, reservationId, updateData);
  }

  // Cancel a reservation
  @Delete(':id/reservations/:reservationId')
  async cancelReservation(@Param('id') userId: string, @Param('reservationId') reservationId: string) {
    return this.userService.cancelReservation(userId, reservationId);
  }
}