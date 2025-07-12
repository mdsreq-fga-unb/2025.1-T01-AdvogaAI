import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import storageConfig from './storage.config';
import { ConfigType } from '@nestjs/config';
import 'multer';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    @Inject('S3_CLIENT') private readonly s3Client: S3Client,
    @Inject(storageConfig.KEY)
    private readonly config: ConfigType<typeof storageConfig>,
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
    const sanitizedPath = destinationPath.replaceAll(' ', '_');
    const command = new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: sanitizedPath,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    try {
      await this.s3Client.send(command);
      this.logger.log(`Arquivo enviado com sucesso para: ${sanitizedPath}`);
      const protocol = this.config.useSSL ? 'https' : 'http';
      const fileUrl = `${protocol}://${this.config.endpoint}:${this.config.port}/${this.config.bucket}/${sanitizedPath}`;
      return fileUrl;
    } catch (error) {
      this.logger.error(`Falha ao fazer upload para ${sanitizedPath}`, error);
      throw new Error('Falha no upload do arquivo.');
    }
  }

  async deleteFile(urlString: string) {
    const url = new URL(urlString);

    const pathname = url.pathname;

    const pathParts = pathname.split('/').filter((part) => part);

    const objectKey = pathParts.slice(1).join('/');
    const command = new DeleteObjectCommand({
      Bucket: this.config.bucket,
      Key: objectKey,
    });
    await this.s3Client.send(command);
  }

  async downloadFile(path: string): Promise<{
    stream: Readable;
    contentType: string;
  }> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.config.bucket,
        Key: path,
      });

      const response = await this.s3Client.send(command);
      if (response.Body instanceof Readable) {
        return {
          stream: response.Body,
          contentType: response.ContentType ?? 'application/octet-stream',
        };
      }
      throw new InternalServerErrorException(
        'O corpo do objeto retornado não é um stream legível.',
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
