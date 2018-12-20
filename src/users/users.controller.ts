import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Param, HttpStatus } from '@nestjs/common';
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
  all() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async details(@Param('id') id: string) {
    try {
      const user: User = await this.usersService.getUserById(+id);
      return user;
    } catch (error) {
      return error;
    }
  }
}
