import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { User } from './../../data/entities/user.entity';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { validate } from 'class-validator';
import { Role } from 'src/data/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async registerUser(user: UserRegisterDTO) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

    if (userFound) {
      throw new Error('Email already in use');
    }

    user.password = await bcrypt.hash(user.password, 10);

    const userToAdd: User = new User();

    userToAdd.email = user.email;
    userToAdd.password = user.password;
    userToAdd.firstName = user.firstName;
    userToAdd.lastName = user.lastName;

    if (!(await this.usersRepository.count({}))) {
      const role: Role = new Role();
      role.name = 'admin';
      userToAdd.roles = [];
      userToAdd.roles.push(role);
    }

    await this.usersRepository.create(userToAdd);

    const result = await this.usersRepository.save(userToAdd);

    return result;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: User = await this.usersRepository.findOne({ where: { email: payload.email } });
    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository
      .findOne({
        select: ['email', 'password'],
        relations: ['roles'],
        where: { email: user.email },
      });

    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);

      if (result) {
        return userFound;
      }
    }

    return null;
  }

  async getAll() {
    return this.usersRepository.find({});
  }
}
