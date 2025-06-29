import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateModeloDocumentoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  tipo_documento: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  tagsSistemaIds?: number[];

  @IsOptional()
  url: string;
}
