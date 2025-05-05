import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JwtWrapperService } from './jwt.service';

@Module({
  imports: [
    ConfigModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const privateKeyPath =
          configService.get<string>('JWT_PRIVATE_KEY_PATH') ||
          join(__dirname, '../../../src/common/keys/private.key');
        const publicKeyPath =
          configService.get<string>('JWT_PUBLIC_KEY_PATH') ||
          join(__dirname, '../../../src/common/keys/public.key');

        return {
          privateKey: readFileSync(privateKeyPath, 'utf8'),
          publicKey: readFileSync(publicKeyPath, 'utf8'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '4h',
          },
        };
      },
    }),
  ],
  providers: [JwtWrapperService],
  exports: [JwtWrapperService, NestJwtModule],
})
export class JwtModule {}
