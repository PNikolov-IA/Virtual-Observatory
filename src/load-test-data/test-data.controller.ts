import { Controller, UseGuards, HttpStatus, Res, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../common';
import { TestDataService } from './test-data.service';

@Controller('test-data')
export class TestDataController {

  constructor(
    private readonly testDataService: TestDataService,

  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  async loadTestData(@Res() response): Promise<string> {
    try {
      const insertedUsers = await this.testDataService.loadUsers();
      const insertedInstruments = await this.testDataService.loadInstruments();
      const insertedObjects = await this.testDataService.loadAstronomicalObjects();
      const insertedObjectTypes = await this.testDataService.loadObjectTypes();
      const insertedSpectralTypes = await this.testDataService.loadSpectralTypes();
      const insertedProjects = await this.testDataService.loadProjects();
      const insertedObservation = await this.testDataService.loadObservation();

      return response.status(HttpStatus.OK)
        .json({
          message: 'Successfully load test data.',
          data: [
            insertedUsers,
            insertedInstruments,
            insertedObjects,
            insertedObjectTypes,
            insertedSpectralTypes,
            insertedProjects,
            insertedObservation,
          ],
        });

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }
  }
}
