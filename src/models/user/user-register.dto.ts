import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';

export class UserRegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 10, {message: `The length of the password should be between 6-10 characters`})
  password: string;

  @Length(2, 20, {message: 'The length of the first name should be between 2-20 characters'})
  firstName: string;

  @Length(2, 20, {message: 'The length of the last name should be between 2-20 characters'})
  lastName: string;
}
