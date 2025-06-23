import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class CreatePessoaJuridicaDto {
  @IsNotEmpty()
  @IsString()
  razaoSocial: string;

  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  tipoEmpresa: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  endereco: CreateAddressDto;
}
