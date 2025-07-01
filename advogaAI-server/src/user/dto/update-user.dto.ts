import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { IsOAB } from 'src/shared/validators/is-oab-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'zezinha cabrero',
    description: 'Nome do usuário que será atualizado',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '123456',
    description: 'OAB do usuário que será atualizado',
  })
  @IsString()
  @IsOptional()
  @IsOAB()
  oab?: string;

  @ApiProperty({
    example: '(00) 00000-0000',
    description: 'Telefone do usuário que será atualizado',
  })
  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  phone?: string;
}
