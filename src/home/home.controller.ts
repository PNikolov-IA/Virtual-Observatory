import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  @HttpCode(HttpStatus.OK)
  home(): object {
    return {
      data: 'Virtual observatory home page. To access the data you need to login.',
    };
  }
}