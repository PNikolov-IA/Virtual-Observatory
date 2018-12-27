import { Controller, UseGuards, HttpStatus, Post, Body, Res, Get, Query, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { ProjectInsertDTO } from '../models/project/project-insert.dto';
import { ProjectAlterDTO } from '../models/project/project-alter.dto';

@Controller('projects')
export class ProjectsController {

  constructor(
    private readonly projectsService: ProjectsService,

  ) { }

  @Get()
  @UseGuards(AuthGuard())
  async getAll(@Res() response): Promise<string> {

    try {
      const foundProjects = await this.projectsService.getProjects();
      return response.status(HttpStatus.OK)
        .json({ statusCode: HttpStatus.OK, status: 'OK', message: 'Successfully find all projects.', data: foundProjects });

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getById(@Param('id') id: string, @Res() response): Promise<string> {

    try {
      const foundProject = await this.projectsService.getProjectById(+id);
      return response.status(HttpStatus.OK)
        .json({ statusCode: HttpStatus.OK, status: 'OK', message: 'Successfully find the project.', data: foundProject });

    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json(error.message);

    }

  }

  @Post()
  @UseGuards(AuthGuard())
  async insertProject(@Body() project: ProjectInsertDTO, @Res() response): Promise<string> {

    try {
      const insertedProject = await this.projectsService.insertProject(project);
      return response.status(HttpStatus.CREATED)
        .json({ statusCode: HttpStatus.OK, status: 'OK', message: 'Successfully inserted.', data: insertedProject });

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

  @Put()
  @UseGuards(AuthGuard())
  async alterProject(@Body() project: ProjectAlterDTO, @Res() response): Promise<string> {

    try {
      const alteredProject = await this.projectsService.alterProject(project);
      return response.status(HttpStatus.OK)
        .json({ statusCode: HttpStatus.OK, status: 'OK', message: 'Successfully changed.', data: alteredProject });

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(error.message);

    }

  }

}
