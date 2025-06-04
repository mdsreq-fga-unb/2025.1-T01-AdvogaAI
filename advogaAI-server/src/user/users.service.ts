import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreationService } from './services/user-creation-service';
import { LoginUserDto } from './dto/user-login.dto';
import { UserLoginService } from './services/user-login-service';

@Injectable()
export class UsersService {
  constructor(
    private readonly UserCreationService: UserCreationService,
    private readonly UserLoginService: UserLoginService,
  ) {}

  async createUser(user: CreateUserDto) {
    return this.UserCreationService.createUser(user);
  }

  async loginUser(user: LoginUserDto) {
    return this.UserLoginService.loginUser(user);
  }
}
