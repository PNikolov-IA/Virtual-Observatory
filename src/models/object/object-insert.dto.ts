import { IsString, IsNumber, Length, MaxLength } from 'class-validator';

export class ObjectInsertDTO {
  @IsString()
  @Length(3, 20, { message: 'The length should be between 3-20 characters' })
  identifier: string;

  @IsString()
  @Length(8, 30, { each: true, message: 'The length should be between 8-30 characters' })
  coordinates: string;

  @IsNumber()
  magnitude?: number;

  @MaxLength(150, { message: `Max length is 150 characters` })
  description?: string;
}
