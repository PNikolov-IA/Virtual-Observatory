import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
        const foundObjectTypes = await this.objectTypesRepository.find();

        if (!foundObjectTypes) {
            throw new NotFoundException('Unsuccessfully try to find the object types.');
        }

        return foundObjectTypes;
    }

    async getObjectTypeById(id: number): Promise<ObjectType> {
        const foundObjectType = await this.objectTypesRepository.findOne({ where: { id } });

        if (!foundObjectType) {
            throw new NotFoundException('Unsuccessfully try to find object type.');
        }

        return foundObjectType;
    }

    async insertObjectType(objectType: ObjectTypeInsertDTO): Promise<ObjectType> {
        const foundObjectType: ObjectType = await this.objectTypesRepository
            .findOne({ where: objectType.type });

        if (foundObjectType) {
            throw new BadRequestException('The object type already exist.');
        }

        const objectTypeToInsert: ObjectType = new ObjectType();
        objectTypeToInsert.type = objectType.type;

        this.objectTypesRepository.create(objectTypeToInsert);
        const result = await this.objectTypesRepository.save(objectTypeToInsert);

        if (!result) {
            throw new BadRequestException('Unsuccessfully try to save object type.');
        }

        return objectTypeToInsert;
    }

    async alterObjectType(objectType: ObjectTypeAlterDTO): Promise<string> {
        const foundObjectType: ObjectType = await this.objectTypesRepository
            .findOne({ where: objectType.insertedType });

        if (foundObjectType) {
            foundObjectType.type = objectType.typeToAlter;
        } else {
            throw new BadRequestException('Type object not found.');
        }

        this.objectTypesRepository.create(foundObjectType);
        const result = await this.objectTypesRepository.save(foundObjectType);

        if (!result) {
            throw new BadRequestException('Unsuccessfully try to save the altered object type.');
        }

        return objectType.typeToAlter;
    }
}
