import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async validateUser(user_name: string, password: string): Promise<any> {
    const user = { user_name, password };
    if (user.user_name === user_name && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user_name: user.user_name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
