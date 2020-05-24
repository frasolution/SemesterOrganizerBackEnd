import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  findOne(id:number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id:number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
