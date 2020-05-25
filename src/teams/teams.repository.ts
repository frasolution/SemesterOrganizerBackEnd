import { Repository, EntityRepository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from 'src/users/users.repository';
import { InternalServerErrorException } from '@nestjs/common';
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
  ): Promise<void> {
    const { teamName, usernames } = createTeamDto;
    const team = this.create();
    const users = await usersRepository
      .createQueryBuilder('user')
      .where('user.username IN (:...usernames)', { usernames: usernames })
      .getMany();

    team.name = teamName;
    team.users = users;
    team.courses = [];

    try {
      await team.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
