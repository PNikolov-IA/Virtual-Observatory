import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AstronomicalObject } from '../data/entities/object.entity';
import { ObjectInsertDTO } from '../models/object/object-insert.dto';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectRepository(AstronomicalObject)
    private readonly objectsRepository: Repository<AstronomicalObject>,
  ) { }

  async getObjects(): Promise<AstronomicalObject[]> {
    return await this.objectsRepository.find();
  }

  async getObjectById(id: number): Promise<AstronomicalObject> {
    return await this.objectsRepository.findOneOrFail({ where: { id } });
  }

  async insertObject(object: ObjectInsertDTO): Promise<AstronomicalObject> {
    const foundObject: AstronomicalObject = await this.objectsRepository
      .findOne({ where: { identifier: object.identifier } });

    if (foundObject) {
      throw new Error('The object already exist.');
    }

    const objectToInsert: AstronomicalObject = new AstronomicalObject();
    objectToInsert.identifier = object.identifier;
    objectToInsert.coordinates = object.coordinates;
    objectToInsert.magnitude = object.magnitude;
    objectToInsert.description = object.description;

    this.objectsRepository.create(objectToInsert);
    await this.objectsRepository.save(objectToInsert);

    return objectToInsert;
  }
}
