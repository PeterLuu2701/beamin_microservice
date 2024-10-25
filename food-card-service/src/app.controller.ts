import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-all-food-card')
  getAllFoodCard() {
    return this.appService.getAllFoodCard();
  }

  @MessagePattern('get-food-card-by-search')
findByKeyword(@Payload() payload: { keyword: string; page: number }) {
    return this.appService.findByKeyword(payload);
}
}
