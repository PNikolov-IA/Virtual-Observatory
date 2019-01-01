import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SpectralTypesService } from './spectral-type.service';
import { SpectralTypesController } from './spectral-type.controller';
import { SpectralType } from '../data/entities/spectral-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpectralType]), CoreModule, AuthModule],
  providers: [SpectralTypesService],
  exports: [],
  controllers: [SpectralTypesController],
})
export class SpectralTypesModule { }
