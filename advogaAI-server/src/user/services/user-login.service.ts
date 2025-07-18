import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserDto } from '../dto/user-login.dto';
import { compare } from 'src/utils/hash.util';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { Response } from 'express';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(inuser: LoginUserDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: inuser.email },
    });
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorreto');
    }

    if (!user.isActive) {
      throw new HttpException('Usuario bloqueado', HttpStatus.FORBIDDEN);
    }
    if (!user.isConfirmed) {
      throw new HttpException(
        'E-mail ainda não confirmado',
        HttpStatus.FORBIDDEN,
      );
    }
    const isPasswordValid = await compare(inuser.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }
    const token = this.jwtService.signToken({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });

    const isProduction = process.env.MODE === 'cloud';

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });

    return {
      name: user.name,
      email: user.email,
      statusCode: HttpStatus.OK,
      message: 'Login bem sucedido',
    };
  }
}
