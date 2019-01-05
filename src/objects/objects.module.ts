import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AstronomicalObject } from 'src/data/entities/object.entity';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { ObjectType } from 'src/data/entities/object-type.entity';
import { SpectralType } from 'src/data/entities/spectral-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AstronomicalObject, ObjectType, SpectralType]), CoreModule, AuthModule],
  providers: [ObjectsService],
  exports: [],
  controllers: [ObjectsController],
})
export class ObjectsModule { }
