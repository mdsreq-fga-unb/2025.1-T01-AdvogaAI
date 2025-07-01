/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GetUserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUserData(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          email: true,
          name: true,
          oab: true,
          phone: true,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
