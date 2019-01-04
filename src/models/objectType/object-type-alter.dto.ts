import { IsString, Min } from 'class-validator';

export class ObjectTypeAlterDTO {
    @IsString()
    @Min(2)
    insertedType: string;

    @IsString()
    @Min(2)
    typeToAlter: string;
}
