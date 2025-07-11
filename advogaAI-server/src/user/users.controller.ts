import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { Response } from 'express';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly UserService: UsersService,
    private readonly JwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('data')
  async getUserData(@UserId() userId: string) {
    return await this.UserService.getUserData(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard-data')
  async getDashboardData(@UserId() userId: string) {
    return await this.UserService.getDashboardData(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('data')
  async updateUserData(@UserId() userId: string, @Body() data: UpdateUserDto) {
    return await this.UserService.updateUserData(userId, data);
  }

  @Post('register')
  async createUser(@Body() user: CreateUserDto) {
    return await this.UserService.createUser(user);
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const isProduction = process.env.MODE === 'cloud';
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 * 1000,
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
