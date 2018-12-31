import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { IsEmail, Length, IsString } from 'class-validator';
import { Observation } from './observation.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 10 })
  @IsString()
  password: string;

  @Column({ length: 20 })
  @Length(2, 20, { message: 'The length of the first name should be between 2-20 characters' })
  firstName: string;

  @Column({ length: 20 })
  @Length(2, 20, { message: 'The length of the last name should be between 2-20 characters' })
  lastName: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Observation, observation => observation.observer && observation.operator)
  observations: Observation[];
}
