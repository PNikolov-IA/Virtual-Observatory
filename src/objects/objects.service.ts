import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AstronomicalObject } from 'src/data/entities/object.entity';
import { ObjectInsertDTO } from 'src/models/object/object-insert.dto';
import { SpectralType } from 'src/data/entities/spectral-type.entity';
import { ObjectType } from 'src/data/entities/object-type.entity';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectRepository(AstronomicalObject)
    private readonly objectsRepository: Repository<AstronomicalObject>,
    @InjectRepository(ObjectType)
    private readonly objectTypesRepository: Repository<ObjectType>,
    @InjectRepository(SpectralType)
    private readonly spectralTypesRepository: Repository<SpectralType>,
  ) { }

  async getObjects(): Promise<AstronomicalObject[]> {
    return await this.objectsRepository.find();
  }

  async getObjectById(id: number): Promise<AstronomicalObject> {
    return await this.objectsRepository.findOneOrFail({ where: { id } });
  }

  async insertObject(object: ObjectInsertDTO): Promise<AstronomicalObject> {
    const foundObject: AstronomicalObject = await this.objectsRepository.findOne({ where: object.identifier });

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
