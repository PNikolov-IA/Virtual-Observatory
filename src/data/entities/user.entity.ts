import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IsEmail, Length, IsString } from 'class-validator';
import { Role } from './role.entity';
import { Observation } from './observation.entity';

@Entity({name: 'users'})
export class User {
  private readonly minLen = 3;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @Length(6, 10, {message: `The length of the password should be between 6-10 characters`})
  password: string;

  @Column()
  @Length(2, 20, {message: 'The length of the first name should be between 2-20 characters'})
  firstName: string;

  @Column()
  @Length(2, 20, {message: 'The length of the last name should be between 2-20 characters'})
  lastName: string;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(type => Observation, observation => observation.observer && observation.operator)
  observations: Observation[];
}
