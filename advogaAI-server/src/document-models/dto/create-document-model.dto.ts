import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModeloDocumentoDto {
  @ApiProperty({
    description: 'O nome do modelo de documento.',
    example: 'Procuração Ad-Judicia',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @ApiProperty({
    description: 'Uma descrição opcional sobre o modelo.',
    example: 'Modelo de procuração para representação em juízo.',
    required: false,
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'O tipo ou categoria do documento.',
    example: 'Procuração',
  })
  @IsString()
  tipo_documento: string;

  @ApiProperty({
    description:
      'Um array com os IDs das tags de sistema a serem associadas ao modelo.',
    type: [Number],
    required: false,
    example: [1, 5, 12],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(Number);
    }
    return [Number(value)];
  })
  tagsSistemaIds?: number[];

  @IsOptional()
  url: string;
}
