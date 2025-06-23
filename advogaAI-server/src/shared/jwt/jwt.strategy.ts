import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { getKeyPath } from 'src/utils/getPathKey';
import { PrismaService } from 'prisma/prisma.service';

// Define o tipo do payload que esperamos do JWT
export interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    // Configurações da estratégia
    super({
      // Extrai o token do cabeçalho 'Authorization' como um Bearer Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Garante que tokens expirados sejam rejeitados
      ignoreExpiration: false,
      // Chave pública para verificar a assinatura do token
      secretOrKey: readFileSync(getKeyPath('public.key'), 'utf8'),
      // O algoritmo DEVE ser o mesmo usado para assinar (sign)
      algorithms: ['RS256'],
    });
  }

  /**
   * Método de validação.
   * Este método é chamado pelo passport-jwt APÓS verificar a assinatura e a expiração do token.
   * O 'payload' é o conteúdo decodificado do JWT.
   */
  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true, // Renomeado de userId para id para consistência
        isActive: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Acesso negado. Usuário inativo ou não encontrado.',
      );
    }

    const { ...result } = user;
    return result;
  }
}
