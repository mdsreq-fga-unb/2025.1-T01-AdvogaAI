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
  Headers,
  Patch,
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

import { PessoaJuridicaService } from './services/pessoa-juridica.service';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { UpdatePessoaFisicaDto } from './dto/update-pessoa-fisica.dto';
import { ClientsService } from './clients.service';
import { UpdatePessoaJuridicaDto } from './dto/update-pessoa-juridica.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly pessoaFisicaService: PessoaFisicaService,
    private readonly pessoaJuridicaService: PessoaJuridicaService,
    private readonly clientsService: ClientsService,
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

  // @UseGuards(JwtAuthGuard)
  // @Post('pessoa-juridica')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({
  //   summary: 'Registrar um novo cliente (Pessoa Jurídica) e seu representante',
  // })
  // @ApiBody({ type: RegisterJuridicalClientDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Cliente pessoa jurídica criado com sucesso.',
  // })
  // @ApiResponse({
  //   status: 409,
  //   description: 'Conflito. Já existe uma empresa com o CNPJ informado.',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Requisição inválida. Verifique os dados enviados.',
  // })
  // createPessoaJuridica(
  //   @Body() registerJuridicalClientDto: RegisterJuridicalClientDto,
  //   @UserId() userId: string,
  // ) {
  //   return this.pessoaJuridicaService.create(
  //     registerJuridicalClientDto,
  //     userId,
  //   );
  // }

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
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @UserId() userId: string,
    @Query('search') search?: string,
  ) {
    return this.pessoaFisicaService.findAllByUserId(
      userId,
      limit,
      offset,
      search,
    );
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
  @UseGuards(JwtAuthGuard)
  @Patch('pessoa-fisica/:id')
  async updatePessoaFisica(
    @Param('id') id: string,
    @Body() data: UpdatePessoaFisicaDto,
    @UserId() userId: string,
  ) {
    return await this.clientsService.updatePessoaFisica(id, data, userId);
  }

  @UseGuards(JwtAuthGuard)
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
