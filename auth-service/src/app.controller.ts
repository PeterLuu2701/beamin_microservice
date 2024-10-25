import { Body, Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('login-user')
  async login(@Body() loginDto: { user_name: string; password: string }) {
    const user = await this.appService.validateUser(loginDto.user_name, loginDto.password);

    if (user) {
      return this.appService.login(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
