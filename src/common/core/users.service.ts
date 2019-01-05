import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './../../data/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async registerUser(user: UserRegisterDTO): Promise<User> {
    const userFound: User = await this.usersRepository.findOne({ where: { email: user.email } });

    if (userFound) {
      throw new Error('Email already in use.');
    }

    user.password = await bcrypt.hash(user.password, 10);

    const userToAdd: User = new User();
    userToAdd.email = user.email;
    userToAdd.password = user.password;
    userToAdd.firstName = user.firstName;
    userToAdd.lastName = user.lastName;

    // first user is admin
    if (!(await this.usersRepository.count())) {
      userToAdd.isAdmin = true;
    }

    this.usersRepository.create(userToAdd);
    await this.usersRepository.save(userToAdd);

    return userToAdd;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository
      .findOne({ select: ['email', 'password', 'isAdmin'], where: { email: user.email } });

    if (userFound) {
      const result: boolean = await bcrypt.compare(user.password, userFound.password);

      if (result) {
        return userFound;
      }
    }

    return null;
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getFilteredUsersByName(firstName: string) {
    return await this.usersRepository
      .find({ where: { firstName } });
  }

  async getUserById(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail({ where: { id } });
  }

  async changeRole(id: number): Promise<User> {
    // check for current admin
    const userToChange: User = await this.usersRepository.findOneOrFail({ where: { id } });

    if (userToChange.isAdmin) {
      userToChange.isAdmin = false;
    } else {
      userToChange.isAdmin = true;
    }

    await this.usersRepository.save(userToChange);

    return userToChange;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: User = await this.usersRepository.findOne({ where: { email: payload.email } });

    if (userFound) {
      return userFound;
    }

    return null;
  }
}
