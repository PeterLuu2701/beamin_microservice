import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('food-type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-all-food-type')
  getAllFoodType() {
    return this.appService.getAllFoodType();
  }
}
