import { Instrument } from './../data/entities/instrument.entity';
import { Observation } from './../data/entities/observation.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObservationInsertDTO } from '../models/observation/observation-insert.dto';
import { User } from '../data/entities/user.entity';
import { AstronomicalObject } from '../data/entities/object.entity';
import { Result } from 'range-parser';

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

    ) { }

    async insertObservation(observation: ObservationInsertDTO) {

        const observationToInsert: Observation = new Observation();

        observationToInsert.date = observation.date;
        observationToInsert.imagePath = observation.imagePath;
        observationToInsert.instrument = await this.instrumentRepository.findOneOrFail({ where: { id: observation.instrumentId } });
        observationToInsert.object = await this.objectRepository.findOneOrFail({ where: { id: observation.objectId } });
        observationToInsert.observer = await this.userRepository.findOneOrFail({ where: { id: observation.observerId } });
        observationToInsert.operator = await this.userRepository.findOneOrFail({ where: { id: observation.operatorId } });

        this.objectRepository.create(observationToInsert);
        const result = await this.observationsRepository.save(observationToInsert);

        if (result) {
            return observationToInsert;
        }

        return null;

    }

    async retrieveObservations() {

        const retrievedObservations = await this.observationsRepository.find({
            relations: ['instrument', 'observer', 'operator', 'object'],
            order: { id: 'ASC' },
        });

        if (retrievedObservations) {
            return retrievedObservations;
        }

        return null;

    }

    async retrieveFilteredObservations(objectIdentifier: string, coordinates: string, instrumentName: string) {

        const retrievedFilteredObservations = await this.observationsRepository.find({
            relations: ['instrument', 'observer', 'operator', 'object'],
            // where: {object: {id: 1},  instrument: { id: 1} },
            // where: { object: { identifier: objectIdentifier } } ,
            order: { id: 'ASC' },
        });

        if (retrievedFilteredObservations) {
            return retrievedFilteredObservations;
        }

        return null;

    }

}
