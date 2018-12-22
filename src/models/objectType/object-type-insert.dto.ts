import { IsString, Min } from 'class-validator';

export class ObjectTypeInsertDTO {

    @IsString()
    @Min(2)
    type: string;

}
