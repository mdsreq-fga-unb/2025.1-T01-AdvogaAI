import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user as User | undefined;
    if (!user || !user.id) {
      throw new UnauthorizedException('Invalid user ID');
    }
    return user.id;
  },
);
