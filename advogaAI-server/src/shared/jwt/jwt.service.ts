import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

export interface JwtVerifyInterface {
  message: string;
  statusCode: number;
  user?: UserType;
}

export interface UserType {
  userId?: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Method to sign token with userId and role
  signToken(payload: {
    userId: string;
    name: string;
    role: string;
    email: string;
    isActive: boolean;
  }): string {
    return this.jwtService.sign(payload, {
      expiresIn: '30d',
    });
  }

  // Method to verify and decode token
  async verifyToken(token: string): Promise<JwtVerifyInterface | undefined> {
    try {
      if (this.jwtService.verify(token)) {
        const user: UserType = this.jwtService.decode(token);
        if (user.userId) {
          const foundUser = await this.prisma.user.findUnique({
            where: {
              id: user.userId,
            },
            select: {
              isActive: true,
              name: true,
              email: true,
              role: true,
            },
          });
          if (!foundUser?.isActive) {
            return { message: 'Invalid or expired token', statusCode: 401 };
          }
          return { message: 'Valid token', statusCode: 200, user: foundUser };
        }
        return { message: 'Invalid or expired token', statusCode: 401 };
      }
    } catch {
      return { message: 'Invalid or expired token', statusCode: 401 };
    }
  }

  //Method to decode token
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
