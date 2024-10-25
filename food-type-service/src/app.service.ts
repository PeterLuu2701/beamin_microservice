import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async getAllFoodType() {
    try {
      const allAppMenuItems = await this.prismaService.app_menu.findMany();
      return allAppMenuItems;
    } catch (error) {
      throw new Error('Failed to get all food card');
    }
  }
}
