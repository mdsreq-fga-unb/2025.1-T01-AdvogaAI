import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  //UseGuards,
} from '@nestjs/common';
//import { JwtAuthGuard } from 'src/shared/jwt/jwt-auth.guard';

@Controller('document-models')
export class DocumentModelsController {
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deletePessoaJuridica(@Param('id') id: string) {
    return id;
  }
}
