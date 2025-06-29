import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from 'src/shared/jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentModelsController } from './document-models.controller';
import { DocumentModelsService } from './services/document-models.service';
import { DocumentModelsRepository } from './repositories/document-models.repository';

@Module({
  imports: [PrismaModule, JwtModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [DocumentModelsService, DocumentModelsRepository],
  controllers: [DocumentModelsController],
  exports: [],
})
export class DocumentModelsModule {}
