import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  @HttpCode(HttpStatus.OK)
  home(): string {
      return 'Virtual observatory home page. To access the data you need to login.';
  }
}