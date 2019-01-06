import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AstronomicalObject } from 'src/data/entities/object.entity';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AstronomicalObject]), CoreModule, AuthModule],
  providers: [ObjectsService],
  exports: [],
  controllers: [ObjectsController],
})
export class ObjectsModule { }
