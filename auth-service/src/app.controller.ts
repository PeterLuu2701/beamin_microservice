import { Body, Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('login-user')
  login(@Body() user) {
    return this.appService.login(user);
  }
}
