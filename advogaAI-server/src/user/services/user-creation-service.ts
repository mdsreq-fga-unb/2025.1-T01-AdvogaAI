/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { hash } from 'src/utils/hash.util';

@Injectable()
export class UserCreationService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: CreateUserDto) {
    try {
      const { name, email, password, confirmPassword } = user;
      if (confirmPassword !== password) {
        return {
          message: 'As senhas devem ser iguais!',
          statusCode: 400,
        };
      }
      const hashedPassword = await hash(password);
      await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return {
        message: `Uusario ${name} criado com sucesso`,
        statusCode: 200,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          message: 'Erro ao criar conta, e-mail já está em uso!',
          statusCode: 400,
        };
      }
      return error as Error;
    }
  }
}
