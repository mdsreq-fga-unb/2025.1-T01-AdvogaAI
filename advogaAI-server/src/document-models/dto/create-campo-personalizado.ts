import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCampoPersonalizadoDto {
  @IsString()
  @IsNotEmpty()
  chave: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
