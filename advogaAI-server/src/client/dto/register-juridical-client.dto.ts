import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePessoaJuridicaDto } from './create-pessoa-juridica.dto';
import { CreatePessoaFisicaDto } from './create-pessoa-fisica.dto';

export class RegisterJuridicalClientDto {
  @IsNotEmpty()
  userId: string;
  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePessoaJuridicaDto)
  pessoaJuridica: CreatePessoaJuridicaDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePessoaFisicaDto)
  representanteLegal: CreatePessoaFisicaDto;
}
