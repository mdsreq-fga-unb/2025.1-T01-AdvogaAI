import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import storageConfig from './storage.config';
import { ConfigType } from '@nestjs/config';
import 'multer';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    @Inject('S3_CLIENT') private readonly s3Client: S3Client,
    @Inject(storageConfig.KEY)
    private config: ConfigType<typeof storageConfig>,
  ) {}

  /**
   * Faz o upload de um arquivo para o MinIO.
   * @param file Objeto do arquivo (do Multer)
   * @param destinationPath Caminho completo do arquivo no bucket
   */
  public async upload(
    file: Express.Multer.File,
    destinationPath: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: destinationPath,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    try {
      await this.s3Client.send(command);
      this.logger.log(`Arquivo enviado com sucesso para: ${destinationPath}`);
      const protocol = this.config.useSSL ? 'https' : 'http';
      const fileUrl = `${protocol}://${this.config.endpoint}:${this.config.port}/${this.config.bucket}/${destinationPath}`;
      return fileUrl;
    } catch (error) {
      this.logger.error(`Falha ao fazer upload para ${destinationPath}`, error);
      throw new Error('Falha no upload do arquivo.');
    }
  }
  async getFileStream(bucket: string, fileKey: string) {
    try {
      const metaCommand = new HeadObjectCommand({
        Bucket: bucket,
        Key: fileKey,
      });
      const { ContentType, ContentLength } =
        await this.s3Client.send(metaCommand);

      const getCommand = new GetObjectCommand({ Bucket: bucket, Key: fileKey });
      const response = await this.s3Client.send(getCommand);

      return {
        stream: response.Body,
        contentType: ContentType,
        contentLength: ContentLength,
      };
    } catch (error) {
      if (error instanceof Error && error.name === 'NotFound') {
        throw new NotFoundException('File not found.');
      }
      throw error;
    }
  }
}
