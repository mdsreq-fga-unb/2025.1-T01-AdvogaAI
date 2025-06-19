import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from 'src/shared/jwt/jwt.service';

@Injectable()
export class GenerateConfirmEmailTokenService {
  constructor(private readonly jwtservice: JwtService) {}

  generateConfirmEmailToken(user: User) {
    try {
      const token = this.jwtservice.signToken({
        email: user.email,
        isActive: user.isActive,
        name: user.name,
        role: user.role,
        userId: user.id,
      });
      return token;
    } catch (error) {
      console.error(error);
    }
  }
}
