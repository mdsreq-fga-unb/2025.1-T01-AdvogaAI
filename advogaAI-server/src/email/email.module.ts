import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailRepository } from './repositories/email.repository';
import { EmailController } from './email.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [EmailService, EmailRepository],
  controllers: [EmailController],
  exports: [],
})
export class UsersModule {}
