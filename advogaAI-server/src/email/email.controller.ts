import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { PrismaService } from 'prisma/prisma.service';
import { GenerateConfirmEmailTokenService } from 'src/user/services/generate-confirm-email-token.service';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { hash } from 'src/utils/hash.util';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendEmailService } from './services/send-email.service';
import { EmailQueueService } from './services/email-queue.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
    private readonly jwtservice: JwtService,
    private readonly GenerateConfirmEmailTokenService: GenerateConfirmEmailTokenService,
    private readonly sendEmailService: SendEmailService,
    private readonly emailQueueService: EmailQueueService,
  ) {}

  @Post('recover-password-request')
  @HttpCode(HttpStatus.OK)
  async recoverPasswordRequest(@Query('email') email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return { message: 'Usuario não foi encontrado', statusCode: 400 };
    }
    const confirmEmailToken =
      this.GenerateConfirmEmailTokenService.generateConfirmEmailToken(user);
    const response = await this.emailQueueService.publishEmail({
      emailDestino: user.email,
      nomeUsuario: user.name,
      titulo: 'Recupere a senha da sua conta',
      assunto: 'Recuperação de senha',
      corpo: 'Clique no botão abaixo para redefinir sua senha!',
      linkBotao: `${process.env.FRONTEND_URL}/recover-password?token=${confirmEmailToken}`,
      textoBotao: 'Redefinir senha',
    });
    if (response.success) {
      return { message: 'E-mail de recuperação enviado!', statusCode: 200 };
    }
    return { message: 'Um erro desconhecido ocorreu!', statusCode: 500 };
  }

  @Post('send-email-service')
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Body() body: SendEmailDto) {
    return await this.emailQueueService.publishEmail(body);
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Query('token') token: string) {
    return await this.emailService.confirmEmail(token);
  }

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  async recoverPassword(
    @Query('token') token: string,
    @Body() data: { password: string; confirmPassword: string },
  ) {
    if (data.confirmPassword !== data.password) {
      return { message: 'As senhas não coincidem', statusCode: 400 };
    }
    const rectoken = await this.jwtservice.verifyToken(token);
    if (rectoken?.statusCode !== 200) {
      return { message: 'Token inválido', statusCode: 400 };
    }
    const hashedPassword = await hash(data.password);
    await this.prisma.user.update({
      where: {
        email: rectoken.user?.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    await this.emailQueueService.publishEmail({
      assunto: 'Senha alterada',
      corpo:
        'Sua senha do AdvogaAI foi alterada, se você não reconhece está ação, entre em contato conosco!',
      emailDestino: rectoken.user?.email ?? '',
      nomeUsuario: rectoken.user?.name ?? '',
      titulo: 'Senha alterada',
    });
    return { message: 'Senha alterada com sucesso', statusCode: 200 };
  }

  @Post('resend-confirm-email')
  @HttpCode(HttpStatus.OK)
  async resendConfirmEmail(@Query('email') email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return { message: 'Usuario não encontrado', statusCode: 400 };
    }
    const confirmEmailToken =
      this.GenerateConfirmEmailTokenService.generateConfirmEmailToken(user);
    return await this.emailQueueService.publishEmail({
      assunto: 'E-mail de confirmação',
      emailDestino: user.email,
      nomeUsuario: user.name,
      titulo: 'Confirme seu e-mail para utilizar o AdvogaAI',
      corpo: 'Clique no link abaixo para confirmar seu e-mail do AdvogaAI',
      textoBotao: 'Confirmar e-mail',
      linkBotao: `${process.env.FRONTEND_URL}/confirm-email?token=${confirmEmailToken}`,
    });
  }

  @MessagePattern('send_email')
  async handleSendEmail(@Payload() data: SendEmailDto) {
    console.log('--- MENSAGEM RECEBIDA PELO CONSUMER ---');
    console.log('Dados recebidos da fila:', data);

    try {
      await this.sendEmailService.sendEmail(data);
      console.log('E-mail processado e enviado com sucesso.');
    } catch (error) {
      console.error('Erro ao processar a mensagem da fila:', error);
    }
  }
}
