import { ProjectAlterDTO } from './../models/project/project-alter.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../data/entities/project.entity';
import { ProjectInsertDTO } from '../models/project/project-insert.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) { }

  async getProjects(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  async getProjectById(id: number): Promise<Project> {
    return await this.projectsRepository.findOneOrFail({ where: { id } });
  }

  async insertProject(project: ProjectInsertDTO): Promise<Project> {
    const foundProject: Project = await this.projectsRepository.findOne({ where: project.name });

    if (foundProject) {
      throw new Error('The project already exist.');
    }

    const projectToInsert: Project = new Project();

    projectToInsert.name = project.name;
    projectToInsert.description = project.description;

    this.projectsRepository.create(projectToInsert);
    await this.projectsRepository.save(projectToInsert);

    return projectToInsert;
  }

  async alterProject(project: ProjectAlterDTO): Promise<Project> {
    const foundProject: Project = await this.projectsRepository.findOneOrFail({ where: project.oldName });

    foundProject.name = project.newName;
    foundProject.description = project.description;

    this.projectsRepository.create(foundProject);
    await this.projectsRepository.save(foundProject);

    return foundProject;
  }
}
