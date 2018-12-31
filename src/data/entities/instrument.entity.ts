import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Length } from 'class-validator';
import { Observation } from './observation.entity';

@Entity('instruments')
export class Instrument {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', unique: true, length: 50 })
    @Length(2, 50, { message: 'The name is too short. The length should be between 2-50 characters' })
    name: string;

    @Column({ type: 'nvarchar', nullable: true, length: 100 })
    @Length(2, 100, { message: 'The length should be between 2-100 characters' })
    setupInfo?: string;

    @OneToMany(type => Observation, observation => observation.instrument, { onDelete: 'SET NULL' })
    observations: Observation[];
}
