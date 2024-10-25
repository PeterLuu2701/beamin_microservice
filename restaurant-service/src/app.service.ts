import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getAllRestaurant() {
    try {
      const allRestaurant = await this.prismaService.restaurant.findMany();
      return allRestaurant;
    } catch (error) {
      throw new Error('Failed to get all restaurants');
    }
  }

  async findRestaurantById(id: number) {
    try {
      const restaurantById = await this.prismaService.restaurant.findMany({
        where: { 
          id: Number(id) 
        },
      });

      console.log('Search result:', restaurantById);
      return restaurantById;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Failed to get restaurant');
    }
  }
}
