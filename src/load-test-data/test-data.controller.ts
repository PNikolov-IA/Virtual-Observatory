import { Controller, UseGuards, HttpStatus, Get, HttpCode } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
  async loadTestData(): Promise<any[]> {
    const insertedUsers = await this.testDataService.loadUsers();
    const insertedInstruments = await this.testDataService.loadInstruments();
    const insertedObjects = await this.testDataService.loadAstronomicalObjects();
    const insertedObjectTypes = await this.testDataService.loadObjectTypes();
    const insertedSpectralTypes = await this.testDataService.loadSpectralTypes();
    const insertedProjects = await this.testDataService.loadProjects();
    const insertedObservation = await this.testDataService.loadObservation();

    const result = [
      insertedUsers,
      insertedInstruments,
      insertedObjects,
      insertedObjectTypes,
      insertedSpectralTypes,
      insertedProjects,
      insertedObservation,
    ];

    return result;
  }
}
