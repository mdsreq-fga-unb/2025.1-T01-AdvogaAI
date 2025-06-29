import {
  BadRequestException,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { CreateModeloDocumentoDto } from './dto/create-document-model.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { DocumentModelsService } from './services/document-model.service';
import { UpdateModeloDocumentoDto } from './dto/update-document-model.dto';
import { TagSistemaService } from './services/system-tags.service';

@Controller('document-models')
export class DocumentModelsController {
  constructor(
    private readonly documentModelsService: DocumentModelsService,
    private readonly tagSistemaService: TagSistemaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteDocumentModel(@Param('id') id: string, @UserId() userId: string) {
    return userId;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('documento'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  async createDocumentModel(
    @Body() createDocumentModelDto: CreateModeloDocumentoDto,
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: string,
  ) {
    if (!file) {
      throw new BadRequestException('O arquivo é obrigatório.');
    }
    return await this.documentModelsService.create(
      createDocumentModelDto,
      file,
      userId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id') // Usar PATCH é ideal para atualizações parciais
  @HttpCode(HttpStatus.OK)
  updateDocumentModel(
    @Param('id') id: string,
    @Body() updateDto: UpdateModeloDocumentoDto,
  ) {
    return this.documentModelsService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard) // Protege a rota, exigindo autenticação
  @Get('system-tags')
  @HttpCode(HttpStatus.OK)
  findAllTags() {
    return this.tagSistemaService.findAll();
  }
}
