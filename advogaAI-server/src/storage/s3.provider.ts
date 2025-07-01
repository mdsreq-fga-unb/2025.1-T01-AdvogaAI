import { Provider } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';
import storageConfig from './storage.config';

export const S3Provider: Provider = {
  provide: 'S3_CLIENT',
  inject: [storageConfig.KEY],
  useFactory: (config: ConfigType<typeof storageConfig>) => {
    if (!config.accessKey || !config.secretKey) {
      throw new Error('S3 credentials are not defined');
    }
    return new S3Client({
      endpoint: `http${config.useSSL ? 's' : ''}://${config.endpoint}:${config.port}`,
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
      },
      forcePathStyle: true,
    });
  },
};
