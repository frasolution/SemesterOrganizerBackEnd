import { Repository, EntityRepository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from 'src/users/users.repository';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../users/user.entity';

@EntityRepository(Team)
export class TeamsRepository extends Repository<Team> {
  async getTeams(
    user: User,
    usersRepository: UsersRepository,
  ): Promise<Team[]> {
    const userEntity = await usersRepository.find({
      relations: ['teams'],
      where: { id: user.id },
    });

    return userEntity[0].teams;
  }

  async createTeam(
    createTeamDto: CreateTeamDto,
    usersRepository: UsersRepository,
  ): Promise<Team> {
    const { teamName, usernames } = createTeamDto;
    const team = this.create();
    const foundUsers = await usersRepository
      .createQueryBuilder('user')
      .where('user.username IN (:...usernames)', { usernames: usernames })
      .getMany();

    if (foundUsers.length !== usernames.length) {
      throw new ConflictException(
        'Could not find certain users for team creation',
      );
    }

    team.name = teamName;
    team.users = foundUsers;
    team.courses = [];

    try {
      return await team.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
