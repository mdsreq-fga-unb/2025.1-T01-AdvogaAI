import {
  IsString,
  IsOptional,
  IsNotEmpty,
  Length,
  IsAlphanumeric,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  logradouro: string;

  @IsNotEmpty()
  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  estado: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  @IsAlphanumeric()
  cep: string;
}
