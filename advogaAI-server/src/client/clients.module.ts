import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ClientsRepository } from './repositories/clients.repository';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { PessoaFisicaRepository } from './repositories/pessoa-fisica.repository';
import { PessoaFisicaService } from './services/pessoa-fisica.service';
import { PessoaJuridicaRepository } from './repositories/pessoa-juridica.repository';
import { PessoaJuridicaService } from './services/pessoa-juridica.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    ClientsService,
    ClientsRepository,
    PessoaFisicaRepository,
    PessoaFisicaService,
    PessoaJuridicaRepository,
    PessoaJuridicaService,
  ],
  controllers: [ClientsController],
  exports: [],
})
export class ClientsModule {}
