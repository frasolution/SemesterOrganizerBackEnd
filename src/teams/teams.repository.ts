import { Repository, EntityRepository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from '../users/users.repository';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';

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
    user: User,
  ): Promise<void> {
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

    // add the user who created the team too, if he did not provided his username
    if (!foundUsers.includes(user)) {
      foundUsers.push(user);
    }

    team.name = teamName;
    team.users = foundUsers;
    team.courses = [];

    try {
      await team.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCoursesByTeam(teamId: number): Promise<Course[]> {
    const teams = await this.find({
      relations: ['courses'],
      where: { id: teamId },
    });

    return teams[0].courses;
  }
}
