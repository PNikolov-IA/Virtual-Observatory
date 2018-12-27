import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Project } from '../data/entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), CoreModule, AuthModule],
  providers: [ProjectsService],
  exports: [],
  controllers: [ProjectsController],
})
export class ProjectsModule { }
