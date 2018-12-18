import { IsString, IsEmail } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
