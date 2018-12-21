import { Controller, UseGuards, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObservationsService } from './observations.service';
import { ObservationInsertDTO } from '../models/observation/observation-insert.dto';

@Controller('observations')
export class ObservationsController {
  constructor(
    private readonly observationsService: ObservationsService,
  ) { }

  @Post()
  @UseGuards(AuthGuard())
  async insert(@Body() observation: ObservationInsertDTO, @Res() response): Promise<string> {
    try {
      const insertedObservation = await this.observationsService.insertObservation(observation);
      return response.status(HttpStatus.OK).json({message: 'Succsessfuly inserted', data: insertedObservation});

    } catch (error) {
      error.message = 'Incurrect input';
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }
}
