import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { SignUpCredentialsDto } from '../auth/dto/sign-up-credentials.dto';
import { Team } from '../teams/team.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    const { firstname, lastname, username, password } = signUpCredentialsDto;
    const user = this.create();
    const team = new Team();
    const salt = await bcrypt.genSalt();

    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;

    team.name = `${user.firstname}s Team`;
    team.members = [user];

    try {
      await user.save();
      await team.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
