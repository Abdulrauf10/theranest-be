import { Injectable } from '@nestjs/common';
import { User, Role } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;
    user.password = await bcrypt.hash(userData.password, 10);
    user.role = userData.role || Role.Patient;

    return this.usersRepository.save(user);
  }

  async findAll(role?: Role): Promise<User[]> {
    let where = {};
    if (role) {
      where = { role };
    }
    return this.usersRepository.find({ where });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
