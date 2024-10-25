import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getAllRestaurantFood() {
    try {
      const allRestaurantFood = await this.prismaService.restaurant_food.findMany();
      return allRestaurantFood;
    } catch (error) {
      throw new Error('Failed to get all restaurant food');
    }
  }
  
  async findRestaurantFoodByRestaurantId(id: number) {
    try {
      const restaurantFoodByRestaurantId = await this.prismaService.restaurant_food.findMany({
        where: { 
          restaurant_id: Number(id) 
        },
      });

      console.log('Search result:', restaurantFoodByRestaurantId);
      return restaurantFoodByRestaurantId;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Failed to get restaurant');
    }
  }
}
