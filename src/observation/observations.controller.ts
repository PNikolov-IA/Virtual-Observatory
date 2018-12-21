import { Controller, UseGuards, HttpStatus, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObservationsService } from './observations.service';
import { ObservationInsertDTO } from '../models/observation/observation-insert.dto';

@Controller('observations')
export class ObservationsController {

  constructor(
    private readonly observationsService: ObservationsService,

  ) { }

  @Get()
  @UseGuards(AuthGuard())
  async getByIdentifier(@Query() query, @Res() response): Promise<string> {

    if (Object.keys(query).length === 0 && query.constructor === Object) {

      try {
        const retrievedObservations = await this.observationsService.retrieveObservations();
        return response.status(HttpStatus.OK).json({ message: 'Successfully observations retrieve.', data: retrievedObservations });

      } catch (error) {
        error.message = 'Unsuccessfully observations retrieve.';
        return response.status(HttpStatus.BAD_REQUEST).json(error.message);        // Status code ???

      }

    } else {

      try {
        const retrievedObservations = await this.observationsService
          .retrieveFilteredObservations(query.objectIdentifier, query.coordinates, query.instrumentName);
        return response.status(HttpStatus.OK).json({ message: 'Successfully filtered observations retrieve.', data: retrievedObservations });

      } catch (error) {
        error.message = 'Unsuccessfully filtered observations retrieve.';
        return response.status(HttpStatus.BAD_REQUEST).json(error.message);

      }

    }

  }

  @Post()
  @UseGuards(AuthGuard())
  async insert(@Body() observation: ObservationInsertDTO, @Res() response): Promise<string> {

    try {
      const insertedObservation = await this.observationsService.insertObservation(observation);
      return response.status(HttpStatus.OK).json({ message: 'Successfully inserted.', data: insertedObservation });

    } catch (error) {
      error.message = 'Incorrect data input.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }
}
