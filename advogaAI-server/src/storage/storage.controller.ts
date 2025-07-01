import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';
import { UserId } from 'src/shared/decorators/user-id.decorator';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

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

    const filename = objectKey.split('/').pop() || 'download';

    const { stream, contentType } =
      await this.storageService.downloadFile(objectKey);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    stream.pipe(res);
  }
}
