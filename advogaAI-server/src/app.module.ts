import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './shared/jwt/jwt.module';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UserCreationService } from './user/services/user-creation-service';
import { PrismaService } from 'prisma/prisma.service';
import { UserLoginService } from './user/services/user-login-service';
import { ClientsController } from './client/clients.controller';
import { ClientsService } from './client/clients.service';

@Module({
  imports: [JwtModule],
  controllers: [AppController, UsersController, ClientsController],
  providers: [
    AppService,
    UsersService,
    UserCreationService,
    ClientsService,
    PrismaService,
    UserLoginService,
  ],
})
export class AppModule {}
