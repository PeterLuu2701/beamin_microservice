import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService,
    private jwtService: JwtService
  ) {}

  async createOrder(
    token: string,
    quantity: number,
    restaurantId: string,
    restaurantFoodId: string,
  ) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.sub;

      const food = await this.prismaService.restaurant_food.findUnique({
        where: { id: Number(restaurantFoodId) },
        select: { food_name: true, price: true },
      });

      if (!food) {
        throw new Error('Invalid food item');
      }

      const restaurant = await this.prismaService.restaurant.findUnique({
        where: { id: Number(restaurantId) },
        select: { restaurant_name: true },
      });

      if (!restaurant) {
        throw new Error('Invalid restaurant');
      }

      const total = Number(food.price) * quantity;

      const order = await this.prismaService.orders.create({
        data: {
          user_id: userId,
          food_name: food.food_name,
          price: food.price,
          quantity,
          total,
          restaurant_name: restaurant.restaurant_name,
          restaurant_id: Number(restaurantId),
          restaurant_food_id: Number(restaurantFoodId),
          delivery_status: 'pending', 
        },
      });

      return order;
    } catch (error) {
      throw new UnauthorizedException(
        'Order creation failed or token is invalid',
      );
    }
  }
}
