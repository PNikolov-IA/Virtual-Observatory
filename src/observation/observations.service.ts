import { Instrument } from './../data/entities/instrument.entity';
import { Observation } from './../data/entities/observation.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
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
        private readonly projectsRepository: Repository<Project>,

    ) { }

    async insertObservation(observation: ObservationInsertDTO) {

        const observationToInsert: Observation = new Observation();

        observationToInsert.date = observation.date;
        observationToInsert.imagePath = observation.imagePath;
        observationToInsert.instrument = await this.instrumentRepository.findOneOrFail({ where: { id: observation.instrumentId } });
        observationToInsert.object = await this.objectRepository.findOneOrFail({ where: { id: observation.objectId } });
        observationToInsert.observer = await this.userRepository.findOneOrFail({ where: { id: observation.observerId } });
        observationToInsert.operator = await this.userRepository.findOneOrFail({ where: { id: observation.operatorId } });
        observationToInsert.projects = await this.projectsRepository.find({ where: { id: observation.projectsId } });

        this.objectRepository.create(observationToInsert);
        await this.observationsRepository.save(observationToInsert);

        return observationToInsert;

    }

    async retrieveObservations() {

        const retrievedObservations = await this.observationsRepository.find({
            relations: ['instrument', 'observer', 'operator', 'object', 'projects'],
            order: { id: 'ASC' },
        });

        if (!retrievedObservations) {
            throw new NotFoundException();
        }

        return retrievedObservations;
    }

    async retrieveObservationById(id: number) {

        const retrievedObservation = await this.observationsRepository.findOneOrFail({
            relations: ['instrument', 'observer', 'operator', 'object', 'projects'],
            where: { id },
        });
        return retrievedObservation;
    }

    async retrieveFilteredObservations(objectIdentifier: string) {

        const retrievedFilteredObservations = await this.observationsRepository.find({
            relations: ['instrument', 'observer', 'operator', 'objects', 'projects'],
            where: { object: { identifier: objectIdentifier } } ,  // It is not working properly!
            order: { id: 'ASC' },
        });

        if (!retrievedFilteredObservations) {
            throw new NotFoundException();
        }

        return retrievedFilteredObservations;

    }

}
