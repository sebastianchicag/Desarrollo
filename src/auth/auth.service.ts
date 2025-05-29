import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(userData: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject(); 
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
