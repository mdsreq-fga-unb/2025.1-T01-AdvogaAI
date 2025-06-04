import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { JwtService } from './jwt.service';
import { getKeyPath } from 'src/utils/getPathKey';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    ConfigModule,
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const privateKeyPath = getKeyPath('private.key');
        const publicKeyPath = getKeyPath('public.key');

        return {
          privateKey: readFileSync(privateKeyPath, 'utf8'),
          publicKey: readFileSync(publicKeyPath, 'utf8'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: configService.get<string>('JWT_EXPIRES_IN') ?? '4h',
          },
        };
      },
    }),
  ],
  providers: [JwtService, PrismaService],
  exports: [JwtService, NestJwtModule],
})
export class JwtModule {}
