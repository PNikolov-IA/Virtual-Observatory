import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Param, HttpStatus, Put, HttpCode, NotFoundException, Query } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
  async all(@Query() query): Promise<User[]> {
    if (!Object.keys(query).length) {
      return await this.usersService.getAll();
    } else {
      return await this.usersService.getFilteredUsersByName(query.firstName);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  @HttpCode(HttpStatus.OK)
  async getDetails(@Param('id', UserByIdPipe) id: number): Promise<User> {
    try {
      return await this.usersService.getUserById(id);
    } catch (error) {
      throw new NotFoundException('No such user.');
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  @HttpCode(HttpStatus.OK)
  async changeRole(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.changeRole(+id);
    } catch (error) {
      throw new NotFoundException('No such user.');
    }
  }
}
