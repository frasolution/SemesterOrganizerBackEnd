import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  firstname: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  lastname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
