import { IsString, Length } from 'class-validator';

export class ProjectAlterDTO {

    @IsString()
    @Length(3, 100)
    oldName: string;

    @IsString()
    @Length(3, 100)
    newName: string;

    @IsString()
    @Length(20, 200)
    description?: string;

}
