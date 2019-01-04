import { UserLoginDTO } from '../models/user/user-login.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Controller, Post, Body, ValidationPipe, BadRequestException, HttpStatus, HttpCode, ConflictException } from '@nestjs/common';
import { User } from 'src/data/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async sign(@Body(new ValidationPipe({ transform: true, whitelist: true }))
  user: UserLoginDTO,
  ): Promise<string> {
    const token = await this.authService.signIn(user);

    if (!token) {
      throw new BadRequestException('Wrong credentials.');
    }

    return token;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: UserRegisterDTO,
  ): Promise<User> {
    try {
      return await this.usersService.registerUser(user);
    } catch (error) {
      throw new ConflictException('This email is already registered.');
    }
  }
}
