import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
    constructor(
        private prismaService: PrismaService
    ){}

    
    @MessagePattern('get-all-user')
    async getAllUser(){
        return await this.prismaService.users.findMany()
    }

}
