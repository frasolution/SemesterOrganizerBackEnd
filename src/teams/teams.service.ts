import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsRepository } from './teams.repository';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from 'src/users/users.repository';
import { User } from '../users/user.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamsRepository)
    private teamsRepository: TeamsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getTeams(user: User): Promise<Team[]> {
    return await this.teamsRepository.getTeams(user, this.usersRepository);
  }

  async createTeam(createTeamDto: CreateTeamDto, user: User): Promise<void> {
    return await this.teamsRepository.createTeam(
      createTeamDto,
      this.usersRepository,
      user,
    );
  }

  async findOne(id: number): Promise<Team> {
    return await this.teamsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.teamsRepository.delete(id);
  }
}
