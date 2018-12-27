import { ProjectAlterDTO } from './../models/project/project-alter.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

        const foundProjects = await this.projectsRepository.find();

        if (!foundProjects) {
            throw new NotFoundException('Unsuccessfully try to find the projects.');
        }

        return foundProjects;

    }

    async getProjectById(id: number): Promise<Project> {

        const foundProject = await this.projectsRepository.findOne({ where: { id } });

        if (!foundProject) {
            throw new NotFoundException('Unsuccessfully try to find the project.');
        }

        return foundProject;
    }

    async insertProject(project: ProjectInsertDTO): Promise<Project> {

        const foundProjects: Project[] = await this.findProjects();

        for (const elements of foundProjects) {
            if (elements.name === project.name) {
                throw new BadRequestException('The project already exist.');
            }
        }

        const projectToInsert: Project = new Project();
        projectToInsert.name = project.name;
        if (project.description) {
            projectToInsert.description = project.description;
        }

        this.projectsRepository.create(projectToInsert);
        const result = await this.projectsRepository.save(projectToInsert);

        if (!result) {
            throw new BadRequestException('Unsuccessfully try to input the data.');
        }

        return projectToInsert;

    }

    async alterProject(project: ProjectAlterDTO): Promise<string> {

        const foundProjects: Project[] = await this.findProjects();

        let foundOldProjectName = false;
        for (const elements of foundProjects) {
            if (elements.name === project.oldName) {
                elements.name = project.newName;
                if (project.description) {
                    elements.description = project.description;
                }

                foundOldProjectName = true;
                break;
            }
        }

        if (!foundOldProjectName) {
            throw new BadRequestException('No such project.');
        }

        this.projectsRepository.create(foundProjects);
        const result = await this.projectsRepository.save(foundProjects);

        if (!result) {
            throw new BadRequestException('Unsuccessfully try to input the data.');
        }

        return project.newName;

    }

    findProjects() {

        const foundProjects = this.projectsRepository.find();

        if (!foundProjects) {
            throw new BadRequestException('Unsuccessfully try to find the project.');
        }

        return foundProjects;

    }

}
