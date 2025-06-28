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

@Controller('document-models')
export class DocumentModelsController {
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteDocumentModel(@Param('id') id: string, @UserId() userId: string) {
    return userId;
  }
}
