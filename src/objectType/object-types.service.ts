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

        const getedObjectTypes = await this.objectTypesRepository.find();

        if (!getedObjectTypes) {
            throw new NotFoundException();
        }

        return getedObjectTypes;

    }

    async getObjectTypeById(id: number): Promise<ObjectType> {

        const getedObjectType = await this.objectTypesRepository.findOneOrFail({ where: { id } });

        if (!getedObjectType) {
            throw new NotFoundException();
        }

        return getedObjectType;
    }

    async insertObjectType(objectType: ObjectTypeInsertDTO): Promise<ObjectType> {

        const objectTypeToInsert: ObjectType = new ObjectType();
        objectTypeToInsert.type = objectType.type;

        this.objectTypesRepository.create(objectTypeToInsert);
        const result = await this.objectTypesRepository.save(objectTypeToInsert);

        if (!result) {
            throw new BadRequestException();
        }

        return objectTypeToInsert;

    }

    async alterObjectType(objectType: ObjectTypeAlterDTO) {

        const findedObjectType: ObjectType[] = await this.objectTypesRepository.find();

        let findedType = false;
        for (const elements of findedObjectType) {
            if (elements.type === objectType.insertedType) {
                elements.type = objectType.typeToAlter;
                findedType = true;
            }
        }

        this.objectTypesRepository.create(findedObjectType);
        const result = await this.objectTypesRepository.save(findedObjectType);

        if (!result || !findedType) {
            throw new BadRequestException();
        }

        return objectType.typeToAlter;

    }

}
