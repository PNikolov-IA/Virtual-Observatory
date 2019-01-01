import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UsersService } from 'src/common/core/users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform<string> {
    constructor(private readonly usersService: UsersService) { }

    transform(value: string, metadata: ArgumentMetadata) {
        return parseInt(value, 10);
    }
}