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
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
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
