import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { UserId } from 'src/shared/decorators/user-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'prisma/prisma.service';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('url-download')
  @ApiOperation({ summary: 'Get file to download' })
  @ApiResponse({ status: 200, description: 'Returned file downloaded' })
  @UseGuards(JwtAuthGuard)
  async downloadFile(
    @Body('url') url: string,
    @Res() res: Response,
    @UserId() userId: string,
  ) {
    const urlObject = new URL(url);

    const pathname = urlObject.pathname;

    if (!pathname.includes(userId)) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este arquivo.',
      );
    }

    const pathAfterHost = pathname.substring(1);
    const bucketName = pathAfterHost.split('/')[0];
    const objectKey = pathAfterHost.replace(`${bucketName}/`, '');

    if (!objectKey) {
      throw new HttpException(
        'Não foi possível extrair o caminho do arquivo da URL.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const filename = objectKey.split('/').pop() ?? 'download';

    const { stream, contentType } =
      await this.storageService.downloadFile(objectKey);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    stream.pipe(res);
  }

  @Post('upload-generated-model/*filename')
  @ApiOperation({ summary: 'Upload generated model' })
  @ApiResponse({ status: 200, description: 'File uploaded' })
  @UseInterceptors(FileInterceptor('documento'))
  @UseGuards(JwtAuthGuard)
  async uploadGeneratedModel(
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: string,
    @Param('filename') originalfilename: string,
    @Query('modelid') modelid: string,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('Arquivo não enviado.');
      }
      const path = `users/${userId}/generated-models`;

      const replacedPath = path.replaceAll(',', '/');
      const timestamp = Date.now();

      const fileName = `${replacedPath}/${timestamp}_${originalfilename}`;
      const model = await this.prisma.modeloDocumento.findUnique({
        where: {
          id: modelid,
        },
      });
      if (!model) {
        throw new BadRequestException('Documento nao encontrado');
      }
      const uploadedFile = await this.storageService.upload(file, fileName);
      await this.prisma.documentoGerado.create({
        data: {
          nome: originalfilename,
          url: uploadedFile,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
          descricao: model?.descricao ?? '',
          tipo_documento: model?.tipo_documento ?? '',
        },
      });
      return { message: 'Arquivo enviado com sucesso.', statusCode: 200 };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
