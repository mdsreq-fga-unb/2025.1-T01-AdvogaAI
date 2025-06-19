import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Email do destinatário final.',
    example: 'cliente@exemplo.com',
  })
  @IsEmail({}, { message: 'O campo emailDestino deve ser um email válido.' })
  @IsNotEmpty({ message: 'O campo emailDestino não pode estar vazio.' })
  emailDestino: string;

  @ApiProperty({
    description:
      'Nome do usuário que receberá o email, usado para personalização no corpo do email.',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário não pode estar vazio.' })
  nomeUsuario: string;

  @ApiProperty({
    description:
      'Assunto do email, que será exibido na caixa de entrada do destinatário.',
    example: 'Confirmação de Cadastro',
  })
  @IsString()
  @IsNotEmpty({ message: 'O assunto do email não pode estar vazio.' })
  assunto: string;

  @ApiProperty({
    description:
      'Título principal que será exibido dentro do corpo do email, no template padrão.',
    example: 'Bem-vindo ao AdvogaAI!',
  })
  @IsString()
  @IsNotEmpty({ message: 'O título da mensagem não pode estar vazio.' })
  titulo: string;

  @ApiProperty({
    description:
      'Parágrafo principal da mensagem que será inserido no template.',
    example:
      'Sua conta foi criada com sucesso. Clique no botão abaixo para verificar seu email.',
  })
  @IsString()
  @IsNotEmpty({ message: 'O corpo da mensagem não pode estar vazio.' })
  corpo: string;

  @ApiPropertyOptional({
    description:
      'Texto opcional que aparecerá no botão de chamada para ação (CTA) no email.',
    example: 'Confirmar meu Email',
  })
  @IsString()
  @IsOptional()
  textoBotao?: string;

  @ApiPropertyOptional({
    description:
      'URL opcional para a qual o botão de CTA irá redirecionar o usuário.',
    example: 'https://www.advogaai.com.br/confirmar?token=xyz123',
  })
  @IsUrl({}, { message: 'O link do botão deve ser uma URL válida.' })
  @IsOptional()
  linkBotao?: string;
}
