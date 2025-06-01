import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/user-login.dto';
import { JwtService } from 'src/shared/jwt/jwt.service';

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
  @Post('login')
  async loginUser(@Body() user: LoginUserDto) {
    return await this.UserService.loginUser(user);
  }
  @Post('validate-token')
  async validateToken(@Body() token: string) {
    return await this.JwtService.verifyToken(token);
  }
}
