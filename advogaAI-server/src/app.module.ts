import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './client/clients.module';
import { UsersModule } from './user/users.module';
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
import { PessoaFisicaService } from './client/services/pessoa-fisica.service';
import { PessoaFisicaRepository } from './client/repositories/pessoa-fisica.repository';
import { PessoaJuridicaService } from './client/services/pessoa-juridica.service';
import { PessoaJuridicaRepository } from './client/repositories/pessoa-juridica.repository';
import { DocumentModelsService } from './document-models/services/document-models.service';
import { DocumentModelsRepository } from './document-models/repositories/document-models.repository';
import { DocumentModelsController } from './document-models/document-models.controller';
import { DocumentModelsModule } from './document-models/document-models.module';
import { StorageModule } from './storage/storage.module';
import { GetUserService } from './user/services/get-user.service';
import { UpdateUserService } from './user/services/update-user.service';
import { StorageController } from './storage/storage.controller';
import { DocumentoService } from './document-models/services/document.service';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { EmailQueueService } from './email/services/email-queue.service';
import { NotificationModule } from './notification/notification.module';
import { ProcessosModule } from './process/process.module';

@Module({
  imports: [
    JwtModule,
    ClientsModule,
    UsersModule,
    DocumentModelsModule,
    ProcessosModule,
    NotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.zoho.com',
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
    RabbitMQModule.register({
      name: 'RABBITMQ_SERVICE',
      queue: 'send_email',
    }),
    DocumentModelsModule,
    StorageModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ClientsController,
    EmailController,
    DocumentModelsController,
    StorageController,
  ],
  providers: [
    ClientsRepository,
    PessoaFisicaRepository,
    PessoaJuridicaService,
    PessoaFisicaRepository,
    PessoaJuridicaRepository,
    AppService,
    UsersService,
    EmailService,
    UserCreationService,
    PessoaFisicaService,
    SendEmailService,
    GenerateConfirmEmailTokenService,
    ClientsService,
    PrismaService,
    GetUserService,
    UpdateUserService,
    UserLoginService,
    DocumentModelsService,
    DocumentModelsRepository,
    DocumentoService,
    EmailQueueService,
  ],
})
export class AppModule {}
