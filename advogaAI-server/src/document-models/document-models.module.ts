import { Module } from '@nestjs/common';
import { DocumentModelsController } from './document-models.controller';
import { CreateDocumentModelRepository } from './repositories/create-document-model.repository';
import { DocumentModelsService } from './services/document-model.service';
import { StorageService } from 'src/storage/storage.service';
import { S3Provider } from 'src/storage/s3.provider';
import storageConfig from 'src/storage/storage.config';
import { ConfigModule } from '@nestjs/config';
import { TagSistemaRepository } from './repositories/system-tags.repository';
import { TagSistemaService } from './services/system-tags.service';

@Module({
  providers: [
    CreateDocumentModelRepository,
    DocumentModelsService,
    StorageService,
    S3Provider,
    TagSistemaRepository,
    TagSistemaService,
  ],
  controllers: [DocumentModelsController],
  imports: [ConfigModule.forFeature(storageConfig)],
  exports: [DocumentModelsService, TagSistemaRepository, TagSistemaService],
})
export class DocumentModelsModule {}
