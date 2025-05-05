import { Injectable } from '@nestjs/common';
import {
  JwtSignOptions,
  JwtVerifyOptions,
  JwtService as NestJwtService,
} from '@nestjs/jwt';

@Injectable()
export class JwtWrapperService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign<Payload extends Record<string, unknown>>(
    payload: Payload,
    options?: JwtSignOptions,
  ): string {
    return this.jwtService.sign(payload, options);
  }

  verify<Payload extends Record<string, unknown>>(
    token: string,
    options?: JwtVerifyOptions,
  ): Payload {
    return this.jwtService.verify<Payload>(token, options);
  }

  decode<Payload extends Record<string, unknown>>(
    token: string,
  ): Payload | null {
    return this.jwtService.decode<Payload>(token);
  }
}
