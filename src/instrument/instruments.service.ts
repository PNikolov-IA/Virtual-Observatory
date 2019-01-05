import { Instrument } from '../data/entities/instrument.entity';
import { Injectable } from '@nestjs/common';
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
    return await this.instrumentsRepository.find();
  }

  async getInstrumentById(id: number): Promise<Instrument> {
    return await this.instrumentsRepository.findOneOrFail({ where: { id } });
  }

  async insertInstrument(instrument: InstrumentInsertDTO): Promise<Instrument> {
    const foundInstrument: Instrument = await this.instrumentsRepository
      .findOne({ where: { name: instrument.name } });

    if (foundInstrument) {
      throw new Error('The instrument already exist.');
    }

    const instrumentToInsert: Instrument = new Instrument();

    instrumentToInsert.name = instrument.name;
    instrumentToInsert.setupInfo = instrument.setupInfo;

    this.instrumentsRepository.create(instrumentToInsert);
    await this.instrumentsRepository.save(instrumentToInsert);

    return instrumentToInsert;
  }
}
