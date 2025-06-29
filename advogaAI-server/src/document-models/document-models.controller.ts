import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { DocumentModelsService } from './services/document-models.service';
import { CreateModeloDocumentoDto } from './dto/create-document-model.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateModeloDocumentoDto } from './dto/update-document-model.dto';
import { TagSistemaService } from './services/system-tags.service';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';

@ApiTags('Modelos de Documentos') // Agrupa as rotas na UI do Swagger
@ApiBearerAuth() // Indica que todas as rotas neste controller exigem um token JWT
@Controller('document-models')
export class DocumentModelsController {
  constructor(
    private readonly documentModelsService: DocumentModelsService,
    private readonly tagSistemaService: TagSistemaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('documento'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Criar um novo modelo de documento' })
  @ApiBody({
    description:
      'Dados para a criação do modelo. Enviar como multipart/form-data.',
    type: CreateModeloDocumentoDto,
  })
  @ApiResponse({ status: 201, description: 'Modelo criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou arquivo faltando.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @HttpCode(HttpStatus.CREATED)
  async createDocumentModel(
    @Body() createDocumentModelDto: CreateModeloDocumentoDto,
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: string,
  ) {
    if (!file) {
      throw new BadRequestException(
        'O campo do arquivo [documento] é obrigatório.',
      );
    }
    return await this.documentModelsService.create(
      createDocumentModelDto,
      file,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listar modelos de documento com paginação e busca',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de modelos retornada com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  findAllDocumentModels(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @UserId() userId: string,
    @Query('search') search?: string,
  ) {
    return this.documentModelsService.findAllByUserId(
      userId,
      limit,
      offset,
      search,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('system-tags')
  @ApiOperation({ summary: 'Listar todas as tags de sistema disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tags de sistema retornada com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @HttpCode(HttpStatus.OK)
  findAllTags() {
    return this.tagSistemaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um modelo de documento existente' })
  @ApiParam({
    name: 'id',
    description: 'ID do modelo de documento a ser atualizado',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Modelo atualizado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Modelo de documento não encontrado.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @HttpCode(HttpStatus.OK)
  updateDocumentModel(
    @Param('id') id: string,
    @Body() updateDto: UpdateModeloDocumentoDto,
  ) {
    return this.documentModelsService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um modelo de documento' })
  @ApiParam({
    name: 'id',
    description: 'ID do modelo de documento a ser excluído',
    type: 'string',
  })
  @ApiResponse({ status: 200, description: 'Modelo excluído com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Modelo de documento não encontrado.',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @HttpCode(HttpStatus.OK)
  deleteDocumentModel(@Param('id') id: string, @UserId() userId: string) {
    return this.documentModelsService.delete(id, userId);
  }
}
