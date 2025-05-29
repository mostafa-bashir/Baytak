// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ username, password: hash });
    return this.userRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { username } });
  }
}
