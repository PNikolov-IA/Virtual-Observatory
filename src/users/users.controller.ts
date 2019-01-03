import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Param, HttpStatus, Put, Res } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { AdminGuard } from 'src/common';
import { User } from 'src/data/entities/user.entity';
import { UserByIdPipe } from 'src/users/user-by-id.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  async all(@Res() response) {
    try {
      const users = await this.usersService.getAll();
      return response.status(HttpStatus.OK).json(users);

    } catch (error) {
      error.message = 'No users found.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async getDetails(@Param('id', UserByIdPipe) id: number, @Res() response): Promise<User> {
    try {
      const user: User = await this.usersService.getUserById(id);
      return response.status(HttpStatus.OK).json(user);

    } catch (error) {
      error.message = 'No such user.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async changeRole(@Param('id') id: string, @Res() response) {
    try {
      const message: string = await this.usersService.changeRole(+id);
      return response.status(HttpStatus.OK).json(message);

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
