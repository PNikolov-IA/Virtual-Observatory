import { AstronomicalObject } from './object.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsString } from 'class-validator';

@Entity('object_types')
export class ObjectType {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(2, 20, {message: 'Type name is too short. The length should be between 2-20 characters'})
  type: string;

  @OneToMany(type => AstronomicalObject, object => object.objectType)
  objects: AstronomicalObject[];
}
