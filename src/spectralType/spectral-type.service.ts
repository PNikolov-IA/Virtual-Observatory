import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpectralType } from '../data/entities/spectral-type.entity';
import { SpectralTypeInsertDTO } from '../models/spectralType/spectral-type-insert.dto';
import { SpectralTypeAlterDTO } from '../models/spectralType/spectral-type-alter.dto';

@Injectable()
export class SpectralTypesService {

    constructor(

        @InjectRepository(SpectralType)
        private readonly spectralTypesRepository: Repository<SpectralType>,

    ) { }

    async getSpectralTypes(): Promise<SpectralType[]> {

        const foundSpectralTypes = await this.spectralTypesRepository.find();

        if (!foundSpectralTypes) {
            throw new NotFoundException();
        }

        return foundSpectralTypes;

    }

    async getSpectralTypeById(id: number): Promise<SpectralType> {

        const foundSpectralType = await this.spectralTypesRepository.findOneOrFail({ where: { id } });

        if (!foundSpectralType) {
            throw new NotFoundException();
        }

        return foundSpectralType;
    }

    async insertSpectralType(spectralType: SpectralTypeInsertDTO): Promise<SpectralType> {

        const foundSpectralType: SpectralType[] = await this.findSpectralType();

        for (const elements of foundSpectralType) {
            if (elements.type === spectralType.type) {
                throw new BadRequestException('The object type already exist.');
            }
        }

        const spectralTypeToInsert: SpectralType = new SpectralType();
        spectralTypeToInsert.type = spectralType.type;

        this.spectralTypesRepository.create(spectralTypeToInsert);
        const result = await this.spectralTypesRepository.save(spectralTypeToInsert);

        if (!result) {
            throw new BadRequestException('Incorrect data input.');
        }

        return spectralTypeToInsert;

    }

    async alterSpectralType(spectralType: SpectralTypeAlterDTO) {

        const foundSpectralType: SpectralType[] = await this.spectralTypesRepository.find();

        let foundType = false;
        for (const elements of foundSpectralType) {
            if (elements.type === spectralType.insertedType) {
                elements.type = spectralType.typeToAlter;
                foundType = true;
                break;
            }
        }

        this.spectralTypesRepository.create(foundSpectralType);
        const result = await this.spectralTypesRepository.save(foundSpectralType);

        if (!result || !foundType) {
            throw new BadRequestException();
        }

        return spectralType.typeToAlter;

    }

    findSpectralType() {

        const foundSpectralType = this.spectralTypesRepository.find();

        if (!foundSpectralType) {
            throw new BadRequestException();
        }

        return foundSpectralType;

    }

}
