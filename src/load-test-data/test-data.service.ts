import { Project } from './../data/entities/project.entity';
import { ObjectType } from './../data/entities/object-type.entity';
import { AstronomicalObject } from './../data/entities/object.entity';
import { Instrument } from './../data/entities/instrument.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from '../data/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SpectralType } from '../data/entities/spectral-type.entity';
import { Observation } from '../data/entities/observation.entity';

@Injectable()
export class TestDataService {

    async loadUsers(): Promise<any> {
        const insertedUsers = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                { email: 'test1@gmail.com', password: await bcrypt.hash('112345', 10), firstName: 'Ivan', lastName: 'Ivanov' },
                { email: 'test2@gmail.com', password: await bcrypt.hash('212345', 10), firstName: 'Pesho', lastName: 'Peshev' },
                { email: 'test3@gmail.com', password: await bcrypt.hash('312345', 10), firstName: 'Sasho', lastName: 'Sashev' },
            ])
            .execute();

        if (!insertedUsers) {
            throw new BadRequestException('Unsuccessfully try to load test users.');
        }

        return insertedUsers.raw;

    }

    async loadInstruments(): Promise<any> {
        const insertedInstruments = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Instrument)
            .values([
                { name: 'ESpeRo', setupInfo: 'Eshell Spectrograph Rozhen (optical fiber), Spectral Range = 3900-8500 A, Resolution = 30000' },
                { name: 'FoReRo2', setupInfo: 'Focal Reducer Rozhen 2, Multi-mode instrument for observation of Solar System Bodies' },
                { name: 'RCC-focus', setupInfo: 'Ritchey–Chretien prime focus, CCD VersArray 1340x1300 pix, 12.8"/pix' },
            ])
            .execute();

        if (!insertedInstruments) {
            throw new BadRequestException('Unsuccessfully try to load test instruments info.');
        }

        return insertedInstruments.raw;

    }

    async loadAstronomicalObjects(): Promise<any> {
        const insertedObjects = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(AstronomicalObject)
            .values([
                { identifier: 'NGC6744', coordinates: '10 21 45.22 +43 35 57.12', magnitude: 9, description: 'spiral galaxy' },
                {
                    identifier: 'alf Lyr', coordinates: '18 35 14.66 +38 44 09.78',
                    magnitude: 0.03, description: 'Radial velocity / Redshift / cz : V(km/s) -20.60 [0.2];  Parallaxes (mas): 130.23 [0.36]',
                },
            ])
            .execute();

        if (!insertedObjects) {
            throw new BadRequestException('Unsuccessfully try to load test objects info.');
        }

        return insertedObjects.raw;

    }

    async loadObjectTypes(): Promise<any> {
        const insertedObjectTypes = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(ObjectType)
            .values([
                { type: 'galaxy' },
                { type: 'planet' },
                { type: 'star' },
                { type: 'binary star' },
                { type: 'comet' },
                { type: 'asteroid' },
                { type: 'small body' },
            ])
            .execute();

        if (!insertedObjectTypes) {
            throw new BadRequestException('Unsuccessfully try to load test object types info.');
        }

        return insertedObjectTypes.raw;

    }

    async loadSpectralTypes(): Promise<any> {
        const insertedSpectralTypes = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(SpectralType)
            .values([
                { type: 'OBII' },
                { type: 'G2V' },
                { type: 'K5' },
                { type: 'BI' },
                { type: 'F3' },
                { type: 'OVI' },
            ])
            .execute();

        if (!insertedSpectralTypes) {
            throw new BadRequestException('Unsuccessfully try to load test spectral types info.');
        }

        return insertedSpectralTypes.raw;

    }

    async loadProjects(): Promise<any> {
        const insertedProjects = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Project)
            .values([
                { name: 'Big Project', description: 'New Project: description ............. fdas a fads ' },
                { name: 'RACIO', description: 'National Project: description ............. fdas a fads ' },
                { name: 'Small Bodies Project', description: 'Regular Project of IA&NAO: description ............. fdas a fads ' },
            ])
            .execute();

        if (!insertedProjects) {
            throw new BadRequestException('Unsuccessfully try to load test projects info.');
        }

        return insertedProjects.raw;

    }

    async loadObservation(): Promise<any> {
        const insertedObservations = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Observation)
            .values([
                {},
            ])
            .execute();

        if (!insertedObservations) {
            throw new BadRequestException('Unsuccessfully try to load test projects info.');
        }

        return insertedObservations.raw;

    }

}
