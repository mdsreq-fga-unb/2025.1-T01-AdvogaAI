import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UpdateEnderecoDto } from './update-endereco.dto';
import { Type } from 'class-transformer';

export enum EstadoCivil {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

export class UpdatePessoaFisicaDto {
  @ApiProperty({
    description: 'O nome completo da pessoa física',
    example: 'José da Silva',
    minLength: 3,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  nomeCompleto?: string;

  @ApiProperty({
    description: 'O CPF da pessoa física (somente números)',
    example: '12345678901',
    maxLength: 11,
    minLength: 11,
    required: false,
  })
  @IsString()
  cpf?: string;

  @ApiProperty({
    description: 'O RG da pessoa física',
    example: '123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  rg?: string;

  @ApiProperty({
    description: 'O número da Carteira de Trabalho (CTPS)',
    example: '1234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  ctps?: string;

  @ApiProperty({
    description: 'A nacionalidade da pessoa física',
    example: 'Brasileira',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nacionalidade?: string;

  @ApiProperty({
    description: 'O e-mail da pessoa física',
    example: 'jose.silva@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'O telefone de contato com DDD',
    example: '11987654321',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  telefone?: string;

  @ApiProperty({
    description: 'O estado civil da pessoa física',
    example: EstadoCivil.SOLTEIRO,
    enum: EstadoCivil,
    required: false,
  })
  @IsOptional()
  @IsEnum(EstadoCivil, { message: 'Estado civil inválido' })
  estadoCivil?: EstadoCivil;

  @ApiProperty({
    description: 'A profissão da pessoa física',
    example: 'Desenvolvedor',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profissao?: string;

  @ApiProperty({
    description: 'Dados do endereço a serem atualizados.',
    type: UpdateEnderecoDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateEnderecoDto)
  endereco?: UpdateEnderecoDto;

  @ApiProperty({
    description:
      'Array com os IDs das pessoas jurídicas que esta pessoa física representa. Enviar um array (mesmo que vazio) substituirá as associações existentes.',
    example: ['d290f1ee-6c54-4b01-90e6-d701748f0851'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', {
    each: true,
    message: 'Cada ID de empresa deve ser um UUID válido',
  })
  empresasRepresentadasIds?: string[];
}
