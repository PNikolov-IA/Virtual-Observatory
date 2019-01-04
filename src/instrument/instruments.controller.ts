import { Controller, UseGuards, HttpStatus, Post, Body, Get, Param, ParseIntPipe, HttpCode, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InstrumentsService } from './instruments.service';
import { InstrumentInsertDTO } from '../models/instrument/instrument-insert.dto';
import { Instrument } from 'src/data/entities/instrument.entity';

@Controller('instruments')
export class InstrumentsController {
  constructor(
    private readonly instrumentsService: InstrumentsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Instrument[]> {
    return await this.instrumentsService.getInstruments();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Instrument> {
    try {
      return await this.instrumentsService.getInstrumentById(id);
    } catch (error) {
      throw new NotFoundException('No such instrument.');
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async insertInstrument(@Body() instrument: InstrumentInsertDTO): Promise<Instrument> {
    return await this.instrumentsService.insertInstrument(instrument);
  }
}
