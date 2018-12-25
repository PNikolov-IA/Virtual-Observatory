import { IsString, Min } from 'class-validator';

export class SpectralTypeInsertDTO {

    @IsString()
    @Min(2)
    type: string;

}
