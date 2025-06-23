import { Injectable } from '@nestjs/common';
import { SendEmailService } from './services/send-email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly jwtservice: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async sendEmail(data: SendEmailDto) {
    return await this.sendEmailService.sendEmail(data);
  }

  async confirmEmail(token: string) {
    try {
      const response = await this.jwtservice.verifyToken(token);
      if (response?.statusCode === 200) {
        await this.prisma.user.update({
          where: {
            email: response.user?.email,
          },
          data: {
            isConfirmed: true,
          },
        });
        return { message: 'E-mail confirmado com sucesso!', statusCode: 200 };
      }
      return response;
    } catch {
      return { message: 'Um erro desconhecido ocorreu!', statusCode: 200 };
    }
  }
}
