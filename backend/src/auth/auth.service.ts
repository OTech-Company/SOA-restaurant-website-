/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; success: boolean }> {
    const { name, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await this.userModel.create({ name, email, password: hashedPassword });
        const token = this.jwtService.sign({ id: user._id });

        return { token, success: true };
    } catch {
        throw new BadRequestException('Error creating account');
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string; success: boolean; message?: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
        return { token: null, success: false, message: 'Invalid email or password' };
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return { token: null, success: false, message: 'Invalid email or password' };
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, success: true };
  }
}
