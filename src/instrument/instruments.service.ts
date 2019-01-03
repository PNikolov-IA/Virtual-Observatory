import { Instrument } from '../data/entities/instrument.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InstrumentInsertDTO } from '../models/instrument/instrument-insert.dto';

@Injectable()
export class InstrumentsService {

    constructor(

        @InjectRepository(Instrument)
        private readonly instrumentsRepository: Repository<Instrument>,

    ) { }

    async getInstruments(): Promise<Instrument[]> {
        const foundInstruments = await this.instrumentsRepository.find();

        if (!foundInstruments) {
            throw new NotFoundException('Unsuccessfully try to find the instruments.');
        }

        return foundInstruments;
    }

    async getInstrumentById(id: number): Promise<Instrument> {
        const foundInstrument = await this.instrumentsRepository.findOne({ where: { id } });

        if (!foundInstrument) {
            throw new NotFoundException('Unsuccessfully try to find instrument.');
        }

        return foundInstrument;
    }

    async insertInstrument(instrument: InstrumentInsertDTO): Promise<Instrument> {
        const instrumentToInsert: Instrument = new Instrument();

        instrumentToInsert.name = instrument.name;
        instrumentToInsert.setupInfo = instrument.setupInfo;

        this.instrumentsRepository.create(instrumentToInsert);
        const result = await this.instrumentsRepository.save(instrumentToInsert);

        if (!result) {
            throw new NotFoundException('Incorrect data input.');
        }

        return instrumentToInsert;
    }
}
