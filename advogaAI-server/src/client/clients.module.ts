import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ClientsRepository } from './repositories/clients.repository';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ClientsService, ClientsRepository],
  controllers: [ClientsController],
  exports: [],
})
export class ClientsModule {}
