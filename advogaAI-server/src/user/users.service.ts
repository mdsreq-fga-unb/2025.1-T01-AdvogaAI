import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreationService } from './services/user-creation.service';
import { LoginUserDto } from './dto/user-login.dto';
import { UserLoginService } from './services/user-login.service';
import { Response } from 'express';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly UserCreationService: UserCreationService,
    private readonly UserLoginService: UserLoginService,
    private readonly GetUserService: GetUserService,
    private readonly UpdateUserService: UpdateUserService,
    private readonly prisma: PrismaService,
  ) {}

  async getUserData(userId: string) {
    return await this.GetUserService.getUserData(userId);
  }

  async getDashboardData(userId: string) {
    try {
      const pfs = await this.prisma.pessoaFisica.count({
        where: {
          userId,
        },
      });
      const pjs = await this.prisma.pessoaJuridica.count({
        where: {
          userId,
        },
      });
      const docsGerados = await this.prisma.documentoGerado.count({
        where: {
          userId,
        },
      });
      const docsModels = await this.prisma.modeloDocumento.count({
        where: {
          userId,
        },
      });
      return { clientes: pfs + pjs, docsGerados, docsModels };
    } catch {
      throw new InternalServerErrorException('Um erro inesperado ocorreu');
    }
  }

  async updateUserData(userId: string, data: UpdateUserDto) {
    return await this.UpdateUserService.updateUserData(userId, data);
  }

  async createUser(user: CreateUserDto) {
    return this.UserCreationService.createUser(user);
  }

  async loginUser(user: LoginUserDto, res: Response) {
    return this.UserLoginService.loginUser(user, res);
  }
}
