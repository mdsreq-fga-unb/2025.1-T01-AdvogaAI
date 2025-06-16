import { Body, Controller, Headers, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePessoaFisicaDto } from './dto/update-pessoa-fisica.dto';
import { ClientsService } from './clients.service';
import { UpdatePessoaJuridicaDto } from './dto/update-pessoa-juridica.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Patch('pessoa-fisica')
  async updatePessoaFisica(
    @Body() data: UpdatePessoaFisicaDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      return {
        message: 'Acesso não autorizado por falta de token',
        statusCode: 500,
      };
    }
    const tokenParts = token.split(' ');
    return await this.clientsService.updatePessoaFisica(data, tokenParts[1]);
  }

  @Patch('pessoa-juridica')
  async updatePessoaJuridica(
    @Body() data: UpdatePessoaJuridicaDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      return {
        message: 'Acesso não autorizado por falta de token',
        statusCode: 500,
      };
    }
    const tokenParts = token.split(' ');
    return await this.clientsService.updatePessoaJuridica(data, tokenParts[1]);
  }
}
