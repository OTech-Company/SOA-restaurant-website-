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
  import { User } from './user.model';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UsersService) {}
    @Post()
    async create(@Body() createUserDto: User): Promise<User> {
      return this.userService.create(createUserDto);
    }
  
    @Get()
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
      return this.userService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUserDto: User,
    ): Promise<User> {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
      return this.userService.delete(id);
    }
  }
  