import { Module } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service'; // Importa o PrismaService
import { ProcessosController } from './process.controller';
import { ProcessosService } from './process.service';
import { ProcessoRepository } from './process.repository';

@Module({
  imports: [],
  controllers: [ProcessosController],
  providers: [ProcessosService, ProcessoRepository, PrismaService],
  exports: [ProcessosService, ProcessoRepository],
})
export class ProcessosModule {}
