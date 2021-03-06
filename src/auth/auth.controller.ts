import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
