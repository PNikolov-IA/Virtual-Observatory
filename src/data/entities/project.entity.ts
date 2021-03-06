import { Column, PrimaryGeneratedColumn, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Length, IsString } from 'class-validator';
import { Observation } from './observation.entity';

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', unique: true, default: '', length: 100 })
    @IsString()
    @Length(3, 100, { message: 'The length should be between 3-100 characters' })
    name: string;

    @Column({ type: 'nvarchar', unique: true, default: '', length: 200 })
    @IsString()
    @Length(20, 200, { message: 'The length should be between 20-200 characters' })
    description?: string;

    @ManyToMany(type => Observation, observation => observation.projects)
    @JoinTable({ name: 'projects_observations' })
    observations: Promise<Observation[]>;
}
