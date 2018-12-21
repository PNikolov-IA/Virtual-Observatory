import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Param, HttpStatus, Put, Req, HttpCode, Response, Res } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { AdminGuard } from 'src/common';
import { User } from 'src/data/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  @HttpCode(HttpStatus.OK)
  all() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  @HttpCode(HttpStatus.OK)
  async getDetails(@Param('id') id: string) {
    try {
      const user: User = await this.usersService.getUserById(+id);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async changeRole(@Param('id') id: string, @Res() response) {
    try {
      const message: string = await this.usersService.changeRole(+id);
      return response.status(HttpStatus.OK).json(message);

    } catch (error) {
      error.message = 'No such user id.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
