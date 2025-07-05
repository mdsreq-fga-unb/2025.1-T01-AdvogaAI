import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentModelsController } from './document-models.controller';
import { DocumentModelsService } from './services/document-models.service';
import { StorageService } from 'src/storage/storage.service';
import { S3Provider } from 'src/storage/s3.provider';
import storageConfig from 'src/storage/storage.config';
import { TagSistemaRepository } from './repositories/system-tags.repository';
import { TagSistemaService } from './services/system-tags.service';
import { DocumentModelsRepository } from './repositories/document-models.repository';
import { DocumentoService } from './services/document.service';
import { ClientsRepository } from 'src/client/repositories/clients.repository';

@Module({
  providers: [
    DocumentModelsRepository,
    DocumentModelsService,
    StorageService,
    S3Provider,
    TagSistemaRepository,
    TagSistemaService,
    DocumentoService,
    ClientsRepository,
  ],
  controllers: [DocumentModelsController],
  imports: [ConfigModule.forFeature(storageConfig)],
  exports: [DocumentModelsService, TagSistemaRepository, TagSistemaService],
})
export class DocumentModelsModule {}
