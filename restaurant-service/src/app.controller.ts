import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-all-restaurant')
  getAllRestaurant() {
    return this.appService.getAllRestaurant();
  }

  @MessagePattern('get-restaurant-by-id')
  findRestaurantById(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.appService.findRestaurantById(id);
  }
}
