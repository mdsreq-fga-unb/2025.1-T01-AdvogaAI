import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoCivil } from '@prisma/client';
import { CreateAddressDto } from './create-address.dto';

export class CreatePessoaFisicaDto {
  @IsNotEmpty()
  @IsString()
  nomeCompleto: string;

  @IsString()
  cpf: string;

  @IsString()
  rg: string;

  @IsString()
  ctps: string;

  @IsNotEmpty()
  @IsString()
  nacionalidade: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  estadoCivil: EstadoCivil;

  @IsNotEmpty()
  @IsString()
  profissao: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  endereco: CreateAddressDto;
}
