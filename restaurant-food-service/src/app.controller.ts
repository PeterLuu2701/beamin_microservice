import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-all-restaurant-food')
  getAllRestaurantFood() {
    return this.appService.getAllRestaurantFood();
  }

  @MessagePattern('get-restaurant-food-by-restaurant-id')
  findRestaurantFoodByRestaurantId(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.appService.findRestaurantFoodByRestaurantId(id);
  }
}
