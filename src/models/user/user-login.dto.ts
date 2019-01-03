import { IsString, IsEmail } from 'class-validator';

export class UserLoginDTO {

  @IsString()
  email: string;

  @IsString()
  password: string;
}
