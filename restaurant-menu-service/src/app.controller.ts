import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-all-restaurant-menu')
  getAllRestaurantMenu() {
    return this.appService.getAllRestaurantMenu();
  }

  @MessagePattern('get-restaurant-menu-by-restaurant-id')
  findRestaurantMenuByRestaurantId(@Payload() payload: { id: number }) {
    const { id } = payload;
    return this.appService.findRestaurantMenuByRestaurantId(id);
  }
}
