import {
  Controller, UseGuards, HttpStatus, Post, Body, Get, Param, Put, ParseIntPipe, NotFoundException, HttpCode, ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { ProjectInsertDTO } from '../models/project/project-insert.dto';
import { ProjectAlterDTO } from '../models/project/project-alter.dto';
import { Project } from 'src/data/entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Project[]> {
    return await this.projectsService.getProjects();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<Project> {
    try {
      return await this.projectsService.getProjectById(id);
    } catch (error) {
      throw new NotFoundException('No such project.');
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  async insertProject(@Body() project: ProjectInsertDTO): Promise<Project> {
    try {
      return await this.projectsService.insertProject(project);
    } catch (error) {
      throw new ConflictException('The project already exist.');
    }
  }

  @Put()
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  async alterProject(@Body() project: ProjectAlterDTO): Promise<Project> {
    try {
      return await this.projectsService.alterProject(project);
    } catch (error) {
      throw new NotFoundException('No such project.');
    }
  }
}
