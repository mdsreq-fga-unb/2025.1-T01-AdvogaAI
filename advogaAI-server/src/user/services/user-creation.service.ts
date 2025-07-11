/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { hash } from 'src/utils/hash.util';
import { GenerateConfirmEmailTokenService } from './generate-confirm-email-token.service';
import { User } from '@prisma/client';
import { EmailQueueService } from 'src/email/services/email-queue.service';

@Injectable()
export class UserCreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly GenerateConfirmEmailTokenService: GenerateConfirmEmailTokenService,
    private readonly emailQueueService: EmailQueueService,
  ) {}

  async createUser(useCreation: CreateUserDto) {
    try {
      const { name, email, password, confirmPassword } = useCreation;
      if (confirmPassword !== password) {
        return {
          message: 'As senhas devem ser iguais!',
          statusCode: 400,
        };
      }
      const hashedPassword = await hash(password);
      const user: User = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      const confirmEmailToken =
        this.GenerateConfirmEmailTokenService.generateConfirmEmailToken(user);
      await this.emailQueueService.publishEmail({
        assunto: 'E-mail de confirmação',
        emailDestino: user.email,
        nomeUsuario: user.name,
        titulo: 'Confirme seu e-mail para utilizar o AdvogaAI',
        corpo: 'Clique no link abaixo para confirmar seu e-mail do AdvogaAI',
        textoBotao: 'Confirmar e-mail',
        linkBotao: `${process.env.FRONTEND_URL}/confirm-email?token=${confirmEmailToken}`,
      });
      return {
        message: `Usuario ${name} criado com sucesso, confirme seu e-mail para começar a usar o sistema!`,
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
