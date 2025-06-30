import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigModule } from '@nestjs/config';
import storageConfig from './storage.config';
import { S3Provider } from './s3.provider';

@Module({
  providers: [StorageService, S3Provider],
  imports: [ConfigModule.forFeature(storageConfig)],
  exports: [StorageService],
})
export class StorageModule {}
