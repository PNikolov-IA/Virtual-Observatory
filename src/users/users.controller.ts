import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { RolesGuard } from 'src/common';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  all() {
    return this.usersService.getAll();
  }
}
