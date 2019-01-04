import { Observation } from './../data/entities/observation.entity';
import { Project } from './../data/entities/project.entity';
import { ObjectType } from './../data/entities/object-type.entity';
import { AstronomicalObject } from './../data/entities/object.entity';
import { Instrument } from './../data/entities/instrument.entity';
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from '../data/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SpectralType } from '../data/entities/spectral-type.entity';

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

    return insertedUsers;
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

    return insertedInstruments;
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

    return insertedObjects;
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

    return insertedObjectTypes;
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

    return insertedSpectralTypes;
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

    return insertedProjects;
  }

  async loadObservation(): Promise<any> {
    const insertedObservations = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Observation)
      .values([
        { date: new Date(), imagePath: '//dddd' },
        { date: new Date(), imagePath: '//mmmmm' },
      ])
      .execute();

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'instrument')
      .of(1)
      .set(1);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'observer')
      .of(1)
      .set(1);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'operator')
      .of(1)
      .set(2);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'object')
      .of(1)
      .set(1);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'projects')
      .of(1)
      .add(2);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'instrument')
      .of(2)
      .set(2);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'observer')
      .of(2)
      .set(2);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'operator')
      .of(2)
      .set(1);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'object')
      .of(2)
      .set(2);

    await getConnection()
      .createQueryBuilder()
      .relation(Observation, 'projects')
      .of(2)
      .add(2);

    return insertedObservations;
  }
}
