import { Controller, UseGuards, HttpStatus, Post, Body, Res, Get, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InstrumentsService } from './instruments.service';
import { InstrumentInsertDTO } from '../models/instrument/instrument-insert.dto';

@Controller('instruments')
export class InstrumentsController {

  constructor(
    private readonly instrumentsService: InstrumentsService,

  ) { }

  @Get()
  @UseGuards(AuthGuard())
  async getAll(@Res() response): Promise<string> {

    try {
      const findedInstruments = await this.instrumentsService.getInstruments();
      return response.status(HttpStatus.OK).json({ message: 'Successfully find all instruments.', data: findedInstruments });

    } catch (error) {
      error.message = 'Unsuccessfully try to find the instruments.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getById(@Param('id') id: string, @Res() response): Promise<string> {

    try {
      const findedInstrument = await this.instrumentsService.getInstrumentById(+id);
      return response.status(HttpStatus.OK).json({ message: 'Successfully find instrument.', data: findedInstrument });

    } catch (error) {
      error.message = 'Unsuccessfully try to find instrument.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Post()
  @UseGuards(AuthGuard())
  async insertInstrument(@Body() instrument: InstrumentInsertDTO, @Res() response): Promise<string> {

    try {
      const insertedInstrument = await this.instrumentsService.insertInstrument(instrument);
      return response.status(HttpStatus.OK).json({ message: 'Successfully inserted.', data: insertedInstrument });

    } catch (error) {
      error.message = 'Incorrect data input.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }
}
