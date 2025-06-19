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

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
    private readonly GenerateConfirmEmailTokenService: GenerateConfirmEmailTokenService,
  ) {}

  @Post('send-email-service')
  @HttpCode(HttpStatus.OK)
  async sendEmail(@Body() body: SendEmailDto) {
    return await this.emailService.sendEmail(body);
  }

  @Post('confirm-email')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Query('token') token: string) {
    return await this.emailService.confirmEmail(token);
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
    return await this.emailService.sendEmail({
      assunto: 'E-mail de confirmação',
      emailDestino: user.email,
      nomeUsuario: user.name,
      titulo: 'Confirme seu e-mail para utilizar o AdvogaAI',
      corpo: 'Clique no link abaixo para confirmar seu e-mail do AdvogaAI',
      textoBotao: 'Confirmar e-mail',
      linkBotao: `${process.env.FRONTEND_URL}/confirm-email?token=${confirmEmailToken}`,
    });
  }
}
