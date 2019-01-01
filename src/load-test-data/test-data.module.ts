import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { Module } from '@nestjs/common';
import { TestDataService } from './test-data.service';
import { TestDataController } from './test-data.controller';

@Module({
  imports: [CoreModule, AuthModule],
  providers: [TestDataService],
  exports: [],
  controllers: [TestDataController],
})
export class TestDataModule { }
