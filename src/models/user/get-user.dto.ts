import { Role } from 'src/data/entities/role.entity';

export class GetUserDTO {
  email: string;

  password: string;

  roles: Role[];
}
