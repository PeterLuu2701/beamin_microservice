import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    let { user_name, password } = user;

    let checkUser = await this.prismaService.users.findFirst({
      where: {
        user_name,
        password,
      },
    });

    if (checkUser){
      let token = this.jwtService.sign({ userId: checkUser.id}, {
          expiresIn: '1d',
          secret: 'token'
      })
      return token
  } else {
      return 'Wrong email or password'
  }
  }
}
