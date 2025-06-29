import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateModeloDocumentoDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsOptional()
  @IsString()
  tipo_documento: string;
}
