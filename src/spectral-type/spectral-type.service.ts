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
            throw new NotFoundException('Unsuccessfully try to find the spectral types.');
        }

        return foundSpectralTypes;
    }

    async getSpectralTypeById(id: number): Promise<SpectralType> {
        const foundSpectralType = await this.spectralTypesRepository.findOne({ where: { id } });

        if (!foundSpectralType) {
            throw new NotFoundException('Unsuccessfully try to find spectral type.');
        }

        return foundSpectralType;
    }

    async insertSpectralType(spectralType: SpectralTypeInsertDTO): Promise<SpectralType> {
        const foundSpectralType: SpectralType = await this.spectralTypesRepository
            .findOne({ where: spectralType.type });

        if (foundSpectralType) {
            throw new BadRequestException('The spectral type already exist.');
        }

        const spectralTypeToInsert: SpectralType = new SpectralType();
        spectralTypeToInsert.type = spectralType.type;

        this.spectralTypesRepository.create(spectralTypeToInsert);
        const result = await this.spectralTypesRepository.save(spectralTypeToInsert);

        if (!result) {
            throw new BadRequestException('Unsuccessfully try to save the object type input.');
        }

        return spectralTypeToInsert;

    }

    async alterSpectralType(spectralType: SpectralTypeAlterDTO) {
        const foundSpectralType: SpectralType = await this.spectralTypesRepository
            .findOne({ where: spectralType.insertedType });

        if (foundSpectralType) {
            foundSpectralType.type = spectralType.typeToAlter;
        } else {
            throw new BadRequestException('No such spectral type.');
        }

        this.spectralTypesRepository.create(foundSpectralType);
        const result = await this.spectralTypesRepository.save(foundSpectralType);

        if (!result) {
            throw new BadRequestException();
        }

        return spectralType.typeToAlter;
    }
}
