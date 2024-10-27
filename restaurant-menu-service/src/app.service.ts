import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getAllRestaurantMenu() {
    try {
      const allRestaurantMenu = await this.prismaService.restaurant_menu.findMany();
      return allRestaurantMenu;
    } catch (error) {
      throw new Error('Failed to get all restaurant menu');
    }
  }

  async findRestaurantMenuByRestaurantId(id: number) {
    try {
      const restaurantMenuByRestaurantId = await this.prismaService.restaurant_menu.findMany({
        where: { 
          restaurant_id: Number(id) 
        },
      });

      console.log('Search result:', restaurantMenuByRestaurantId);
      return restaurantMenuByRestaurantId;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Failed to get restaurant menu');
    }
  }
}
