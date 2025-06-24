import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly UserService: UsersService,
    private readonly JwtService: JwtService,
  ) {}

  @Post('register')
  async createUser(@Body() user: CreateUserDto) {
    return await this.UserService.createUser(user);
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    let cookieDomain: string | undefined;

    if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) {
      try {
        const frontendUrl = new URL(process.env.FRONTEND_URL);
        if (frontendUrl.hostname !== 'localhost') {
          const domainParts = frontendUrl.hostname.split('.');
          cookieDomain = '.' + domainParts.slice(-2).join('.');
        }
      } catch (e) {
        console.error('Invalid FRONTEND_URL:', e);
      }
    }
    res.clearCookie('authToken', {
      httpOnly: true,
      domain: cookieDomain,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Logout bem sucedido',
    };
  }
  @Post('login')
  async loginUser(
    @Body() user: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.UserService.loginUser(user, res);
  }
  @Post('validate-token')
  async validateToken(@Body() token: { token: string }) {
    return await this.JwtService.verifyToken(token.token);
  }
}
