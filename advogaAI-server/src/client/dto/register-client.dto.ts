import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePessoaFisicaDto } from './create-pessoa-fisica.dto';

export class RegisterClientDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePessoaFisicaDto)
  pessoaFisica: CreatePessoaFisicaDto;
}
