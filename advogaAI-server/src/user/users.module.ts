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
import { SendEmailService } from 'src/email/services/send-email.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    UsersService,
    UsersRepository,
    UserCreationService,
    GetUserService,
    UpdateUserService,
    UserLoginService,
    GenerateConfirmEmailTokenService,
    SendEmailService,
  ],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
