import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ObjectType } from '../data/entities/object-type.entity';
import { ObjectTypesService } from './object-types.service';
import { ObjectTypesController } from './object-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectType]), CoreModule, AuthModule],
  providers: [ObjectTypesService],
  exports: [],
  controllers: [ObjectTypesController],
})
export class ObjectTypesModule { }
