import { ObjectType } from './object-type.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from 'typeorm';
import { MinLength, MaxLength, Length, IsString, IsNumber } from 'class-validator';
import { Observation } from './observation.entity';
import { SpectralType } from './spectral-type.entity';

@Entity('objects')
export class AstronomicalObject {
  // const validator: Validator = new Validator();
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(3, 20, {message: 'The object name is too short. The length should be between 3-20 characters'})
  identifier: string;

  @Column()
  @IsString()
  @Length(8, 10, {each: true, message: 'The object name is too short. The length should be between 3-20 characters'})
  // @CoordinatesAlpha.validate(); validator.validate(coordinates): Validator;
  coordinates: string;

  @Column({nullable: true})
  @IsNumber()
  magnitude?: number;

  @Column({nullable: true})
  @MinLength(2, { message: `Object type is too short. Minimal length is 2 characters` })
  objectTypeId?: number;

  @Column({nullable: true})
  @MinLength(2, { message: `Spectral type is too short. Minimal length is 2 characters` })
  spectralTypeId?: number;

  @Column()
  @MaxLength(150, { message: `Max length is 150 characters` })
  description?: string;

  @OneToMany(type => Observation, observation => observation.object)
  observations: Observation[];

  @ManyToOne(type => ObjectType, objectType => objectType.objects, {nullable: true})
  objectType?: ObjectType;

  @ManyToOne(type => SpectralType, spectralType => spectralType.objects, {nullable: true})
  spectralType?: SpectralType;
}
