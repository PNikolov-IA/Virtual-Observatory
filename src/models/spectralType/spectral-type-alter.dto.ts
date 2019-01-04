import { IsString, Min } from 'class-validator';

export class SpectralTypeAlterDTO {
    @IsString()
    @Min(2)
    insertedType: string;

    @IsString()
    @Min(2)
    typeToAlter: string;
}
