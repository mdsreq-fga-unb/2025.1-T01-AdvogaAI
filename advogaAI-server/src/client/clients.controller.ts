import {
  Body,
  Get,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PessoaFisicaService } from './services/pessoa-fisica.service';
import { RegisterClientDto } from './dto/register-client.dto';
import { RegisterJuridicalClientDto } from './dto/register-juridical-client.dto';
import { PessoaJuridicaService } from './services/pessoa-juridica.service';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { UserId } from 'src/shared/decorators/user-id.decorator';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly pessoaFisicaService: PessoaFisicaService,
    private readonly pessoaJuridicaService: PessoaJuridicaService,
  ) {}

  @UseGuards(JwtAuthGuard)
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
  createPessoaFisica(
    @Body() registerClientDto: RegisterClientDto,
    @UserId() userId: string,
  ) {
    return this.pessoaFisicaService.create(registerClientDto, userId);
  }

  @UseGuards(JwtAuthGuard)
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
    @UserId() userId: string,
  ) {
    return this.pessoaJuridicaService.create(
      registerJuridicalClientDto,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('pessoa-fisica')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar clientes (Pessoa Física) com paginação e busca',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Itens por página',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Termo de busca (nome, CPF, telefone)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes (pessoa física) retornada com sucesso.',
  })
  findAllPessoasFisicas(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('search') search?: string,
  ) {
    return this.pessoaFisicaService.findAll(page, pageSize, search);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('pessoa-fisica/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar um cliente (Pessoa Física) por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente pessoa física a ser deletado',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente pessoa física deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente pessoa física não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao tentar deletar o cliente.',
  })
  deletePessoaFisica(@Param('id') id: string) {
    return this.pessoaFisicaService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('pessoa-juridica/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deletar um cliente (Pessoa Jurídica) por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do cliente pessoa jurídica a ser deletado',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente pessoa jurídica deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente pessoa jurídica não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao tentar deletar o cliente.',
  })
  deletePessoaJuridica(@Param('id') id: string) {
    return this.pessoaJuridicaService.delete(id);
  }
}
