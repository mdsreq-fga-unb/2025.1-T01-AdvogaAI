import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './shared/jwt/jwt.module';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UserCreationService } from './user/services/user-creation.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { UserLoginService } from './user/services/user-login.service';
import { ClientsController } from './client/clients.controller';
import { ClientsService } from './client/clients.service';
import { ClientsRepository } from './client/repositories/clients.repository';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendEmailService } from './email/services/send-email.service';
import { GenerateConfirmEmailTokenService } from './user/services/generate-confirm-email-token.service';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: true,
          port: 465,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
        },
        defaults: {
          from: `"Suporte AdvogaAI" <${configService.get('EMAIL_USER')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    ClientsController,
    EmailController,
  ],
  providers: [
    ClientsRepository,
    AppService,
    UsersService,
    EmailService,
    UserCreationService,
    SendEmailService,
    GenerateConfirmEmailTokenService,
    ClientsService,
    PrismaService,
    UserLoginService,
  ],
})
export class AppModule {}
