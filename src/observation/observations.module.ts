import { User } from './../data/entities/user.entity';
import { AuthModule } from './../auth/auth.module';
import { CoreModule } from './../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Observation } from '../data/entities/observation.entity';
import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';
import { Instrument } from '../data/entities/instrument.entity';
import { AstronomicalObject } from '../data/entities/object.entity';
import { Project } from '../data/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observation, Instrument, AstronomicalObject, User, Project]), CoreModule, AuthModule],
  providers: [ObservationsService],
  exports: [],
  controllers: [ObservationsController],
})
export class ObservationsModule { }
