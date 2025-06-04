import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password1@',
    minLength: 8,
    pattern: '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.~+,;:{}[\]()^<>\-_])[A-Za-z\d@$!%*?&.~+,;:{}[\]()^<>\-_]{8,}$/,
    {
      message:
        'Your password should contain 8 letters, a symbol, a number,  a capitalized letter',
    },
  )
  password: string;
}
