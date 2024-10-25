import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { log } from 'console';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async getAllFoodCard() {
    try {
      const allFoodCard = await this.prismaService.food_card.findMany();
      return allFoodCard;
    } catch (error) {
      throw new Error('Failed to get all food card');
    }
  }

  async findByKeyword(@Payload() payload: { keyword: string; page: number }) {
    try {
      const { keyword, page } = payload;
      const validPage = page > 0 ? page : 1;
      const index = (validPage - 1) * 5;

      if (!keyword || keyword.trim() === '') {
        throw new Error('Keyword cannot be null or empty');
      }

      const foodCardBySearch = await this.prismaService.food_card.findMany({
        where: {
          food_name: {
            contains: String(keyword),
            mode: 'insensitive',
          },
        },
        skip: index,
        take: 5,
      });

      console.log('Search result: ', foodCardBySearch);

      return foodCardBySearch;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error('Failed to get food cards');
    }
  }
}
