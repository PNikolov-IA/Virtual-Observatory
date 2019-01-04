import {
  Controller, UseGuards, HttpStatus, Post, Body, Get, Param, ParseIntPipe, HttpCode, NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObservationsService } from './observations.service';
import { ObservationInsertDTO } from '../models/observation/observation-insert.dto';
import { Observation } from 'src/data/entities/observation.entity';

@Controller('observations')
export class ObservationsController {
  constructor(
    private readonly observationsService: ObservationsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getByIdentifier(): Promise<Observation[]> {
    return await this.observationsService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Observation> {
    try {
      return await this.observationsService.getObservationById(id);
    } catch (error) {
      throw new NotFoundException('No such observation.');
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async insert(@Body() observation: ObservationInsertDTO): Promise<Observation> {
    try {
      return await this.observationsService.insertObservation(observation);
    } catch (error) {
      throw new UnprocessableEntityException('Incorrect data input.');
    }
  }
}
