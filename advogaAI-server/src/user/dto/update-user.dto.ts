import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'f18ff546-c008-439b-8879-e11c2aab33b0',
    description: 'UUID do usuário que será atualizado',
  })
  @IsUUID('4')
  userId: string;

  @ApiProperty({
    example: true,
    description: 'Define se o usuário está ativo ou não',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Define a role (permissão) do usuário',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
