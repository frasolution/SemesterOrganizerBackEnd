import { Repository, EntityRepository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from 'src/users/users.repository';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Team)
export class TeamsRepository extends Repository<Team> {
  async createTeam(
    createTeamDto: CreateTeamDto,
    usersRepository: UsersRepository,
  ): Promise<void> {
    const { teamName, teamMembers } = createTeamDto;
    const team = this.create();
    const members = await usersRepository
      .createQueryBuilder('user')
      .where('user.username IN (:usernames)', { usernames: teamMembers })
      .getMany();

    team.name = teamName;
    team.members = members;

    try {
      await team.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
