import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
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

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  rg: string;

  @IsNotEmpty()
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
