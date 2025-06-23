import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePessoaJuridicaDto } from './create-pessoa-juridica.dto';
import { CreatePessoaFisicaDto } from './create-pessoa-fisica.dto';

export class RegisterJuridicalClientDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePessoaJuridicaDto)
  pessoaJuridica: CreatePessoaJuridicaDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreatePessoaFisicaDto)
  representanteLegal: CreatePessoaFisicaDto;
}
