import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersRepository } from './repositories/users.repository';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { UserCreationService } from './services/user-creation.service';
import { UserLoginService } from './services/user-login.service';
import { GenerateConfirmEmailTokenService } from './services/generate-confirm-email-token.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { EmailModule } from 'src/email/email.module';
@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.register({ name: 'RABBITMQ_SERVICE', queue: 'send_email' }),
    EmailModule,
  ],
  providers: [
    UsersService,
    UsersRepository,
    UserCreationService,
    GetUserService,
    UpdateUserService,
    UserLoginService,
    GenerateConfirmEmailTokenService,
  ],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
