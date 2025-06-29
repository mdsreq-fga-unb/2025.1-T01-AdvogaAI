import { Controller } from '@nestjs/common';
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
import { DocumentModelsService } from './services/document-models.service';

@Controller('document-models')
export class DocumentModelsController {
  constructor(private readonly documentModelsService: DocumentModelsService) {}

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteDocumentModel(@Param('id') id: string, @UserId() userId: string) {
    return this.documentModelsService.delete(id, userId);
  }
}
