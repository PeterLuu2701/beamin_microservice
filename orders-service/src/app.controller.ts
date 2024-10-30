import { Controller, UnauthorizedException, Body, Headers } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('create-order')
  async createOrder(
    @Headers('Authorization') token: string,
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