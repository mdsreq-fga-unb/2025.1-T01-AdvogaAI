import { Injectable } from '@nestjs/common';
import { UpdatePessoaFisicaDto } from './dto/update-pessoa-fisica.dto';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { ClientsRepository } from './repositories/clients.repository';
import { UpdatePessoaJuridicaDto } from './dto/update-pessoa-juridica.dto';

@Injectable()
export class ClientsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly ClientsRepository: ClientsRepository,
  ) {}

  async updatePessoaJuridica(data: UpdatePessoaJuridicaDto, token: string) {
    try {
      const decToken = this.jwtService.decodeToken(token);
      if (!decToken) {
        return { message: 'Token inválido', statusCode: 400 };
      }
      if (!decToken.isActive) {
        return { message: 'Usuario bloqueado', statusCode: 400 };
      }
      const user = await this.ClientsRepository.getUserWithID(decToken.userId);
      if (!user) {
        return { message: 'Usuario não encontrado', statusCode: 400 };
      }
      const pessoaJuridica =
        await this.ClientsRepository.getPessoaJuridicaWithID(
          data.IdPessoaJuridica,
        );
      if (!pessoaJuridica) {
        return { message: 'Pessoa fisica não encontrada', statusCode: 400 };
      }
      await this.ClientsRepository.updatePessoaJuridica(data);
      return {
        message: 'Pessoa juridica atualizada com sucesso',
        statusCode: 500,
      };
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }

  async updatePessoaFisica(
    id: string,
    data: UpdatePessoaFisicaDto,
    userId: string,
  ) {
    try {
      const pessoaFisica =
        await this.ClientsRepository.getPessoaFisicaByIdAndUserId(id, userId);
      if (!pessoaFisica) {
        return { message: 'Pessoa fisica não encontrada', statusCode: 400 };
      }
      await this.ClientsRepository.updatePessoaFisica(id, data);
      return {
        message: 'Pessoa fisica atualizada com sucesso',
        statusCode: 200,
      };
    } catch {
      return { message: 'Internal server error', statusCode: 500 };
    }
  }
}
