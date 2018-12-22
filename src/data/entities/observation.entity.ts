import { Project } from './project.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, ManyToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { User } from './user.entity';
import { Instrument } from './instrument.entity';
import { AstronomicalObject } from './object.entity';

@Entity('observations')
export class Observation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // @IsDate()
    date: Date;

    @Column()
    @IsString()
    imagePath: string;

    @ManyToOne(type => Instrument, instrument => instrument.observations)
    instrument: Instrument;

    @ManyToOne(type => User, observer => observer.observations)
    observer: User;

    @ManyToOne(type => User, operator => operator.observations)
    operator: User;

    @ManyToOne(type => AstronomicalObject, object => object.observations)
    object: AstronomicalObject;

    @ManyToMany(type => Project, project => project.observations)
    projects: Project[];
}
