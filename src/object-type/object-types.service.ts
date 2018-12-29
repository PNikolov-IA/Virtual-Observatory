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
            throw new NotFoundException();
        }

        return foundObjectTypes;

    }

    async getObjectTypeById(id: number): Promise<ObjectType> {

        const foundObjectType = await this.objectTypesRepository.findOneOrFail({ where: { id } });

        if (!foundObjectType) {
            throw new NotFoundException();
        }

        return foundObjectType;
    }

    async insertObjectType(objectType: ObjectTypeInsertDTO): Promise<ObjectType> {

        const foundObjectType: ObjectType[] = await this.findObjectType();

        for (const elements of foundObjectType) {
            if (elements.type === objectType.type) {
                throw new BadRequestException('The object type already exist.');
            }
        }

        const objectTypeToInsert: ObjectType = new ObjectType();
        objectTypeToInsert.type = objectType.type;

        this.objectTypesRepository.create(objectTypeToInsert);
        const result = await this.objectTypesRepository.save(objectTypeToInsert);

        if (!result) {
            throw new BadRequestException('Incorrect data input.');
        }

        return objectTypeToInsert;

    }

    async alterObjectType(objectType: ObjectTypeAlterDTO): Promise<string> {

        const foundObjectType: ObjectType[] = await this.findObjectType();

        let foundType = false;
        for (const elements of foundObjectType) {
            if (elements.type === objectType.insertedType) {
                elements.type = objectType.typeToAlter;
                foundType = true;
                break;
            }
        }

        this.objectTypesRepository.create(foundObjectType);
        const result = await this.objectTypesRepository.save(foundObjectType);

        if (!result || !foundType) {
            throw new BadRequestException();
        }

        return objectType.typeToAlter;

    }

    findObjectType() {

        const foundObjectType = this.objectTypesRepository.find();

        if (!foundObjectType) {
            throw new BadRequestException();
        }

        return foundObjectType;

    }

}
