import { IsString, IsEmail } from 'class-validator';

export class UserLoginDTO {

  @IsString()
  // @IsEmail()
  email: string;

  @IsString()
  password: string;
}
