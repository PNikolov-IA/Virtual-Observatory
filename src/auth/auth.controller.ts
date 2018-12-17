import { RolesGuard } from './../common/guards/roles/roles.guard';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { AdminGuard, Roles } from './../common';
import { FileService } from '../common/core/file.service';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Get, Controller, UseGuards, Post, Body, FileInterceptor, UseInterceptors, UploadedFile, ValidationPipe, UsePipes, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import { unlink } from 'fs';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  root(): string {
    return 'root';
  }

  @Post('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    const token = await this.authService.signIn(user);
    if (!token) {
      throw new BadRequestException('Wrong credentials!');
    }

    return token;
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar', {
    limits: FileService.fileLimit(1, 2 * 1024 * 1024),
    storage: FileService.storage(['public', 'images']),
    fileFilter: (req, file, cb) => FileService.fileFilter(req, file, cb, '.png', '.jpg'),
  }))
  async register(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserRegisterDTO,

    @UploadedFile()
    file,
  ): Promise<string> {
    const folder = join('.', 'public', 'uploads');
    if (!file) {
      user.avatarUrl = join(folder, 'default.png');
    } else {
      user.avatarUrl = join(folder, file.filename);
    }

    try {
      await this.usersService.registerUser(user);
      return 'saved';
    } catch (error) {
      await new Promise((resolve, reject) => {

        // Delete the file if user not found
        if (file) {
          unlink(join('.', file.path), (err) => {
            if (err) {
              reject(error.message);
            }
            resolve();
          });
        }

        resolve();
      });

      return (error.message);
    }
  }
}
