import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PessoaFisicaService } from './services/pessoa-fisica.service';
import { RegisterClientDto } from './dto/register-client.dto';
import { RegisterJuridicalClientDto } from './dto/register-juridical-client.dto';
import { PessoaJuridicaService } from './services/pessoa-juridica.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly pessoaFisicaService: PessoaFisicaService,
    private readonly pessoaJuridicaService: PessoaJuridicaService,
  ) {}

  @Post('pessoa-fisica')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar um novo cliente (Pessoa Física)' })
  @ApiBody({ type: RegisterClientDto })
  @ApiResponse({
    status: 201,
    description: 'Cliente pessoa física criado com sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito. Já existe um cliente com o CPF informado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida. Verifique os dados enviados.',
  })
  createPessoaFisica(@Body() registerClientDto: RegisterClientDto) {
    return this.pessoaFisicaService.create(registerClientDto);
  }

  @Post('pessoa-juridica')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar um novo cliente (Pessoa Jurídica) e seu representante',
  })
  @ApiBody({ type: RegisterJuridicalClientDto })
  @ApiResponse({
    status: 201,
    description: 'Cliente pessoa jurídica criado com sucesso.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflito. Já existe uma empresa com o CNPJ informado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Requisição inválida. Verifique os dados enviados.',
  })
  createPessoaJuridica(
    @Body() registerJuridicalClientDto: RegisterJuridicalClientDto,
  ) {
    return this.pessoaJuridicaService.create(registerJuridicalClientDto);
  }
}
