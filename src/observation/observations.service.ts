import { Instrument } from './../data/entities/instrument.entity';
import { Observation } from './../data/entities/observation.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservationInsertDTO } from '../models/observation/observation-insert.dto';
import { User } from '../data/entities/user.entity';
import { AstronomicalObject } from '../data/entities/object.entity';
import { Project } from '../data/entities/project.entity';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private readonly observationsRepository: Repository<Observation>,
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AstronomicalObject)
    private readonly objectRepository: Repository<AstronomicalObject>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project[]>,
  ) { }

  async insertObservation(observation: ObservationInsertDTO) {
    const observationToInsert: Observation = new Observation();

    observationToInsert.date = observation.date;
    observationToInsert.imagePath = observation.imagePath;
    observationToInsert.instrument = await this.instrumentRepository.findOneOrFail({ where: { id: observation.instrumentId } });
    observationToInsert.object = await this.objectRepository.findOneOrFail({ where: { id: observation.objectId } });
    observationToInsert.observer = await this.userRepository.findOneOrFail({ where: { id: observation.observerId } });
    observationToInsert.operator = await this.userRepository.findOneOrFail({ where: { id: observation.operatorId } });
    observationToInsert.projects = Promise.resolve(await this.projectsRepository.findOne({ where: { id: observation.projectsId } }));

    this.objectRepository.create(observationToInsert);
    await this.observationsRepository.save(observationToInsert);

    return observationToInsert;
  }

  async getAll(): Promise<Observation[]> {
    return await this.observationsRepository.find({
      relations: ['instrument', 'observer', 'operator', 'object', 'projects'],
      order: { id: 'ASC' },
    });
  }

  async getObservationById(id: number): Promise<Observation> {
    return await this.observationsRepository.findOneOrFail({
      relations: ['instrument', 'observer', 'operator', 'object', 'projects'],
      where: { id },
    });
  }
}
