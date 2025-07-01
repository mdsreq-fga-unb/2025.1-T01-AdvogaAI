import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateModeloDocumentoDto {
  @ApiProperty({
    description: 'O novo nome para o modelo de documento.',
    example: 'Procuração Ad-Judicia et Extra',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  nome?: string;

  @ApiProperty({
    description: 'A nova descrição para o modelo.',
    example:
      'Modelo atualizado de procuração para representação em juízo e fora dele.',
    required: false,
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'O novo tipo ou categoria do documento.',
    example: 'Procuração Geral',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipo_documento?: string;
}
