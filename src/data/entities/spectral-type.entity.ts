import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Length, IsString } from 'class-validator';
import { AstronomicalObject } from './object.entity';

@Entity('spectral_types')
export class SpectralType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(2, 20, { message: 'Spectral type name is too short. The length should be between 2-20 characters' })
  type: string;

  @OneToMany(type => AstronomicalObject, object => object.spectralType)
  objects: AstronomicalObject[];
}
