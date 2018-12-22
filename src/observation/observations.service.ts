import { Instrument } from './../data/entities/instrument.entity';
import { Observation } from './../data/entities/observation.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
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
        await this.observationsRepository.save(observationToInsert);

        return observationToInsert;

    }

    async retrieveObservations() {

        const retrievedObservations = await this.observationsRepository.find({
            relations: ['instrument', 'observer', 'operator', 'object'],
            order: { id: 'ASC' },
        });

        if (!retrievedObservations) {
            throw new NotFoundException();
        }

        return retrievedObservations;
    }

    async retrieveObservationById(id: number) {

        const retrievedObservation = await this.observationsRepository.findOneOrFail({
            relations: ['instrument', 'observer', 'operator', 'object'],
            where: { id },
        });
        return retrievedObservation;
    }

    async retrieveFilteredObservations(objectIdentifier: string, coordinates: string, instrumentName: string) {

        const retrievedFilteredObservations = await this.observationsRepository.find({
            relations: ['instrument', 'observer', 'operator', 'object'],
            // where: {object: {id: 1},  instrument: { id: 1} },
            // where: { object: { identifier: objectIdentifier } } ,
            // where: { observation: {object: { identifier: objectIdentifier } } } ,
            order: { id: 'ASC' },
        });
        // console.log('2: ', objectIdentifier);
        // const retrievedFilteredObservations = await getRepository(Observation)
        //     .createQueryBuilder('observation')
        //     .where('observation.object = :object', { object: object.identifier === objectIdentifier })
        //     .where('observation.object.identifier = :identifier', { identifier: objectIdentifier })
        //     // .where('observation.coordinates = :coordinates', { coordinates });

        if (retrievedFilteredObservations) {
            return retrievedFilteredObservations;
        }

        return null;

    }

}
