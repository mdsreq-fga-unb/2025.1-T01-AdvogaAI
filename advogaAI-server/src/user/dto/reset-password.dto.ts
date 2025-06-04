import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password1@',
    minLength: 8,
    pattern: '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.~+,;:{}[\]()^<>\-_])[A-Za-z\d@$!%*?&.~+,;:{}[\]()^<>\-_]{8,}$/,
    {
      message:
        'Your password should contain 8 letters, a symbol, a number,  a capitalized letter',
    },
  )
  newPassword: string;
}
