import { Controller, UseGuards, HttpStatus, Post, Body, Res, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObservationsService } from './observations.service';
import { ObservationInsertDTO } from '../models/observation/observation-insert.dto';

@Controller('observations')
@UseGuards(AuthGuard())
export class ObservationsController {

  constructor(
    private readonly observationsService: ObservationsService,

  ) { }

  @Get()
  async getByIdentifier(@Query() query, @Res() response): Promise<string> {

    if (!Object.keys(query).length) {
      // Select all
      try {
        const retrievedObservations = await this.observationsService.retrieveObservations();
        return response.status(HttpStatus.OK).json({ message: 'Successfully observations retrieve.', data: retrievedObservations });

      } catch (error) {
        error.message = 'Unsuccessfully observations retrieve.';
        return response.status(HttpStatus.BAD_REQUEST).json(error.message);        // Status code ???

      }

    } else {
      // Select by query
      try {
        const retrievedObservations = await this.observationsService
          .retrieveFilteredObservations(query.objectIdentifier);
        return response.status(HttpStatus.OK).json({ message: 'Successfully filtered observations retrieve.', data: retrievedObservations });

      } catch (error) {
        error.message = 'Unsuccessfully filtered observations retrieve.';
        return response.status(HttpStatus.BAD_REQUEST).json(error.message);

      }

    }

  }

  @Get(':id')
  async getById(@Param('id', new ParseIntPipe()) id: number, @Res() response): Promise<string> {

    try {
      const observationFiltered = await this.observationsService.retrieveObservationById(id);
      return response.status(HttpStatus.OK).json({ message: 'Successfully find observation.', data: observationFiltered });

    } catch (error) {
      error.message = 'Unsuccessfully try to find observation.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Get(':id/date')
  async getDate(@Param('id', new ParseIntPipe()) id: number, @Res() response): Promise<string> {

    try {
      const retrievedDateOfObservation = await this.observationsService
        .retrieveDateOfObservation(id);

      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully retrieve the dates of current observations.', data: retrievedDateOfObservation });

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST)
        .json(error.message);
    }

  }

  @Get(':id/object')
  async getObject(@Param('id', new ParseIntPipe()) id: number, @Res() response): Promise<string> {

    try {
      const retrievedObjectOfObservation = await this.observationsService
        .retrieveObjectOfObservation(id);

      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully retrieve the object in observation.', data: retrievedObjectOfObservation });

    } catch (error) {
      error.message = 'Unsuccessfully try to retrieve the object in observation.';
      return response.status(HttpStatus.BAD_REQUEST)
        .json(error.message);
    }

  }

  @Get(':id/object/identifier')
  async getIdentifierOfObject(@Param('id', new ParseIntPipe()) id: number, @Res() response): Promise<string> {

    try {
      const retrievedIdentifierOfObjectInObservation = await this.observationsService
        .retrieveObjectOfObservation(id);

      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully retrieve the name of object in observation.', data: retrievedIdentifierOfObjectInObservation.identifier });

    } catch (error) {
      error.message = 'Unsuccessfully try to retrieve the name of object in observation.';
      return response.status(HttpStatus.BAD_REQUEST)
        .json(error.message);
    }

  }

  @Get(':id/observer')
  async getObserver(@Param('id', new ParseIntPipe()) id: number, @Res() response): Promise<string> {

    try {
      const retrievedObserverOfObservation = await this.observationsService.retrieveObservationById(id);

      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully retrieve the observer of current observation.', data: retrievedObserverOfObservation.observer });

    } catch (error) {
      error.message = 'Unsuccessfully try to retrieve the observer of current observation.';
      return response.status(HttpStatus.BAD_REQUEST)
        .json(error.message);
    }

  }

  @Get(':id/operator')
  async getOperator(@Param('id', new ParseIntPipe()) id: number, @Res() response): Promise<string> {

    try {
      const retrievedOperatorOfObservation = await this.observationsService.retrieveObservationById(id);

      return response.status(HttpStatus.OK)
        .json({ message: 'Successfully retrieve the operator of current observation.', data: retrievedOperatorOfObservation.operator });

    } catch (error) {
      error.message = 'Unsuccessfully try to retrieve the operator of current observation.';
      return response.status(HttpStatus.BAD_REQUEST)
        .json(error.message);
    }

  }

  @Post()
  async insert(@Body() observation: ObservationInsertDTO, @Res() response): Promise<string> {

    try {
      const insertedObservation = await this.observationsService.insertObservation(observation);
      return response.status(HttpStatus.CREATED).json({ message: 'Successfully inserted.', data: insertedObservation });

    } catch (error) {
      error.message = 'Incorrect data input.';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

}
