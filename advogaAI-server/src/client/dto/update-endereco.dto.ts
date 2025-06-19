import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEnderecoDto {
  @ApiProperty({
    description: 'O logradouro do endereço (ex: Rua, Avenida)',
    example: 'Rua das Flores',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  logradouro?: string;

  @ApiProperty({
    description: 'O número do imóvel',
    example: '123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  numero?: string;

  @ApiProperty({
    description: 'O complemento do endereço',
    example: 'Apto 45',
    required: false,
  })
  @IsOptional()
  @IsString()
  complemento?: string;

  @ApiProperty({
    description: 'O bairro',
    example: 'Jardim Primavera',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bairro?: string;

  @ApiProperty({
    description: 'A cidade',
    example: 'São Paulo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cidade?: string;

  @ApiProperty({
    description: 'A sigla do estado (UF)',
    example: 'SP',
    maxLength: 2,
    minLength: 2,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 2, { message: 'O estado deve ter exatamente 2 caracteres' })
  estado?: string;

  @ApiProperty({
    description: 'O Código de Endereçamento Postal (somente números)',
    example: '01001000',
    maxLength: 8,
    minLength: 8,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'O CEP deve ter exatamente 8 caracteres' })
  cep?: string;
}
