import { Body, Controller, Get, Param, Query, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @MessagePattern('create-order')
  async createOrder(
    @Query('token') token: string,
    @Body() body: { quantity: number; restaurantId: string; restaurantFoodId: string },
  ) {
    try {
      const { quantity, restaurantId, restaurantFoodId } = body;
      return await this.appService.createOrder(token, quantity, restaurantId, restaurantFoodId);
    } catch (error) {
      throw new UnauthorizedException('Invalid token or order creation failed');
    }
  }

  
}
