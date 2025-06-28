import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCampoPersonalizadoDto } from './create-campo-personalizado';

export class CreateModeloDocumentoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  tagsSistemaIds?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCampoPersonalizadoDto)
  camposPersonalizados?: CreateCampoPersonalizadoDto[];
}
