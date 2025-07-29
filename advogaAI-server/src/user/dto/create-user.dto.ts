import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    minLength: 3,
  })
  @IsNotEmpty()
  @MinLength(3)
  name: string;

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
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.~+,;:{}[\]()^<>\-_])[A-Za-z\d@$!%*?&#.~+,;:{}[\]()^<>\-_]{8,}$/,
    {
      message:
        'Your password should contain 8 letters, a symbol, a number,  a capitalized letter',
    },
  )
  password: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password1@',
    minLength: 8,
    pattern: '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.~+,;:{}[\]()^<>\-_])[A-Za-z\d@$!%*?&#.~+,;:{}[\]()^<>\-_]{8,}$/,
    {
      message:
        'Your must confirm your password and it should contain 8 letters, a symbol, a number,  a capitalized letter',
    },
  )
  confirmPassword: string;
}
