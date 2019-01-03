import { UserLoginDTO } from '../models/user/user-login.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe, BadRequestException, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  async sign(@Body(new ValidationPipe({ transform: true, whitelist: true }))
  user: UserLoginDTO,
  ): Promise<string> {
    const token = await this.authService.signIn(user);

    if (!token) {
      throw new BadRequestException('Wrong credentials!');
    }

    return token;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: UserRegisterDTO,
  ): Promise<string> {

    await this.usersService.registerUser(user);
    return 'saved';
  }
}
