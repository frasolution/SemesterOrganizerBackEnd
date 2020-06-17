import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsRepository } from './teams.repository';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from 'src/users/users.repository';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';

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

  async getCoursesByTeam(teamId: number): Promise<Course[]> {
    return await this.teamsRepository.getCoursesByTeam(teamId);
  }

  async findOne(teamId: number): Promise<Team> {
    return await this.teamsRepository.findOne(teamId);
  }

  async remove(teamId: number): Promise<void> {
    await this.teamsRepository.delete(teamId);
  }
}
