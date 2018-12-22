import { IsString, Min, Length } from 'class-validator';

export class InstrumentInsertDTO {

    @IsString()
    @Min(2)
    name: string;

    @IsString()
    @Length(2, 100)
    setupInfo?: string;

}
