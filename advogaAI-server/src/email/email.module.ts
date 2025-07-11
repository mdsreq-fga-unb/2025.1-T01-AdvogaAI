import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailRepository } from './repositories/email.repository';
import { EmailController } from './email.controller';
import { EmailQueueService } from './services/email-queue.service';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { SendEmailService } from './services/send-email.service';
import { GenerateConfirmEmailTokenService } from 'src/user/services/generate-confirm-email-token.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.register({ name: 'RABBITMQ_SERVICE', queue: 'send_email' }),
  ],
  providers: [
    EmailService,
    EmailRepository,
    EmailQueueService,
    SendEmailService,
    GenerateConfirmEmailTokenService,
  ],
  controllers: [EmailController],
  exports: [EmailQueueService, SendEmailService],
})
export class EmailModule {}
