import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectType } from '../data/entities/object-type.entity';
import { ObjectTypeInsertDTO } from '../models/objectType/object-type-insert.dto';
import { ObjectTypeAlterDTO } from '../models/objectType/object-type-alter.dto';

@Injectable()
export class ObjectTypesService {
  constructor(
    @InjectRepository(ObjectType)
    private readonly objectTypesRepository: Repository<ObjectType>,
  ) { }

  async getObjectTypes(): Promise<ObjectType[]> {
    return await this.objectTypesRepository.find();
  }

  async getObjectTypeById(id: number): Promise<ObjectType> {
    return await this.objectTypesRepository.findOneOrFail({ where: { id } });
  }

  async insertObjectType(objectType: ObjectTypeInsertDTO): Promise<ObjectType> {
    const foundObjectType: ObjectType = await this.objectTypesRepository.findOne({ where: objectType.type });

    if (foundObjectType) {
      throw new Error('The object type already exist.');
    }

    const objectTypeToInsert: ObjectType = new ObjectType();
    objectTypeToInsert.type = objectType.type;

    this.objectTypesRepository.create(objectTypeToInsert);
    await this.objectTypesRepository.save(objectTypeToInsert);

    return objectTypeToInsert;
  }

  async alterObjectType(objectType: ObjectTypeAlterDTO): Promise<ObjectType> {
    const foundObjectType: ObjectType = await this.objectTypesRepository
      .findOneOrFail({ where: objectType.insertedType });

    foundObjectType.type = objectType.typeToAlter;

    this.objectTypesRepository.create(foundObjectType);
    await this.objectTypesRepository.save(foundObjectType);

    return foundObjectType;
  }
}
