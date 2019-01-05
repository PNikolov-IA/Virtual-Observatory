import { Injectable } from '@nestjs/common';
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
    return await this.spectralTypesRepository.find();
  }

  async getSpectralTypeById(id: number): Promise<SpectralType> {
    return await this.spectralTypesRepository.findOneOrFail({ where: { id } });
  }

  async insertSpectralType(spectralType: SpectralTypeInsertDTO): Promise<SpectralType> {
    const foundSpectralType: SpectralType = await this.spectralTypesRepository
      .findOne({ where: { type: spectralType.type }});

    if (foundSpectralType) {
      throw new Error('The spectral type already exist.');
    }

    const spectralTypeToInsert: SpectralType = new SpectralType();

    spectralTypeToInsert.type = spectralType.type;

    this.spectralTypesRepository.create(spectralTypeToInsert);
    await this.spectralTypesRepository.save(spectralTypeToInsert);

    return spectralTypeToInsert;
  }

  async alterSpectralType(spectralType: SpectralTypeAlterDTO) {
    const foundSpectralType: SpectralType = await this.spectralTypesRepository
      .findOneOrFail({ where: spectralType.insertedType });

    foundSpectralType.type = spectralType.typeToAlter;

    this.spectralTypesRepository.create(foundSpectralType);
    await this.spectralTypesRepository.save(foundSpectralType);

    return foundSpectralType;
  }
}
