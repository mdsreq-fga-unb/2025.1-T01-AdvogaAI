import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, IsUUID } from 'class-validator';
import { UpdateEnderecoDto } from './update-endereco.dto'; // Importa o DTO de edição de endereço

export class UpdatePessoaJuridicaDto {
  @ApiProperty({
    description: 'A razão social da empresa',
    example: 'Silva & Filhos Comércio de Alimentos LTDA',
    required: false,
  })
  @IsOptional()
  @IsString()
  razaoSocial?: string;

  @ApiProperty({
    description: 'O nome fantasia da empresa',
    example: 'Restaurante da Família',
    required: false,
  })
  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @ApiProperty({
    description: 'O CNPJ da empresa (somente números)',
    example: '12345678000199',
    minLength: 14,
    maxLength: 14,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(14, 14, { message: 'O CNPJ deve ter exatamente 14 caracteres' })
  cnpj?: string;

  @ApiProperty({
    description: 'O tipo da empresa (ex: LTDA, MEI, S/A)',
    example: 'LTDA',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoEmpresa?: string;

  @ApiProperty({
    description: 'O e-mail de contato da empresa',
    example: 'contato@silvaefilhos.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'O telefone de contato da empresa',
    example: '6133445566',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({
    description:
      'O ID da Pessoa Física que será o novo representante legal da empresa',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsOptional()
  @IsUUID('all', {
    message: 'O ID do representante legal deve ser um UUID válido',
  })
  representanteLegalId?: string;

  @ApiProperty({
    description: 'O ID da Pessoa juridica',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    required: false,
  })
  @IsUUID('all', {
    message: 'O IdPessoaJuridica da pessoa juridica deve ser um UUID válido',
  })
  IdPessoaJuridica: string;

  @ApiProperty({
    description: 'ID do endereço',
    type: UpdateEnderecoDto,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  endereco?: string;
}
