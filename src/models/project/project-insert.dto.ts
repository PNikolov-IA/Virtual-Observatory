import { IsString, Length } from 'class-validator';

export class ProjectInsertDTO {
    @IsString()
    @Length(3, 100)
    name: string;

    @IsString()
    @Length(20, 200)
    description?: string;
}
