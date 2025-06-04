import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //turns the prisma module global to be used in all application
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
