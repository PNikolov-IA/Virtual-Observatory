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

        const getedSpectralTypes = await this.spectralTypesRepository.find();

        if (!getedSpectralTypes) {
            throw new NotFoundException();
        }

        return getedSpectralTypes;

    }

    async getSpectralTypeById(id: number): Promise<SpectralType> {

        const getedSpectralType = await this.spectralTypesRepository.findOneOrFail({ where: { id } });

        if (!getedSpectralType) {
            throw new NotFoundException();
        }

        return getedSpectralType;
    }

    async insertSpectralType(spectralType: SpectralTypeInsertDTO): Promise<SpectralType> {

        const findedSpectralType: SpectralType[] = await this.findSpectralType();

        for (const elements of findedSpectralType) {
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

        const findedSpectralType: SpectralType[] = await this.spectralTypesRepository.find();

        let findedType = false;
        for (const elements of findedSpectralType) {
            if (elements.type === spectralType.insertedType) {
                elements.type = spectralType.typeToAlter;
                findedType = true;
                break;
            }
        }

        this.spectralTypesRepository.create(findedSpectralType);
        const result = await this.spectralTypesRepository.save(findedSpectralType);

        if (!result || !findedType) {
            throw new BadRequestException();
        }

        return spectralType.typeToAlter;

    }

    findSpectralType() {

        const findedSpectralType = this.spectralTypesRepository.find();

        if (!findedSpectralType) {
            throw new BadRequestException();
        }

        return findedSpectralType;

    }

}
