/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}
  async updateUserData(userId: string, data: UpdateUserDto) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: data.name,
          oab: data.oab,
          phone: data.phone,
        },
        select: {
          email: true,
          name: true,
          oab: true,
          phone: true,
        },
      });
      return { message: 'Dados alterados com sucesso!' };
    } catch (error) {
      if (error.code === 'P2002') {
        return { message: 'A OAB já está vinculada a outra pessoa!' };
      }
      throw new InternalServerErrorException(error);
    }
  }
}
