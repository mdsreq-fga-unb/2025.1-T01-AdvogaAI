import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePessoaFisicaDto } from './create-pessoa-fisica.dto';

export class RegisterClientDto {
  @IsNotEmpty()
  userId: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePessoaFisicaDto)
  pessoaFisica: CreatePessoaFisicaDto;
}
