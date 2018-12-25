import { IsString, IsDate, IsNumber, Min } from 'class-validator';

export class ObservationInsertDTO {

    @IsDate()
    date: Date;

    @IsString()
    imagePath: string;

    @IsNumber()
    @Min(1)
    instrumentId: number;

    @IsNumber()
    @Min(1)
    observerId: number;

    @IsNumber()
    @Min(1)
    operatorId: number;

    @IsNumber()
    @Min(1)
    objectId: number;

}
