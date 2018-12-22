import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Instrument } from '../data/entities/instrument.entity';
import { InstrumentsController } from './instruments.controller';
import { InstrumentsService } from './instruments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument]), CoreModule, AuthModule],
  providers: [InstrumentsService],
  exports: [],
  controllers: [InstrumentsController],
})
export class InstrumentsModule { }
