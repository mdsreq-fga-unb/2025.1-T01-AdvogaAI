import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'User email address',
    required: true,
  })
  @IsEmail()
  email: string;
}
