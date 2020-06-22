import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsRepository } from './teams.repository';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UsersRepository } from 'src/users/users.repository';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';
import { CreateCoursesDto } from 'src/courses/dto/create-courses.dto';
import { EditTeamDto } from './dto/edit-team.dto';

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

  async getCourses(teamId: number): Promise<Course[]> {
    return await this.teamsRepository.getCourses(teamId);
  }

  async createCourses(
    teamId: number,
    createCoursesDto: CreateCoursesDto,
  ): Promise<void> {
    return await this.teamsRepository.createCourses(teamId, createCoursesDto);
  }

  async editTeam(teamId: number, editTeamDto: EditTeamDto): Promise<void> {
    const { teamName } = editTeamDto;
    await this.teamsRepository.update(teamId, { name: teamName });
  }

  async findTeam(teamId: number): Promise<Team> {
    return await this.teamsRepository.findOne(teamId);
  }

  async removeTeam(teamId: number): Promise<void> {
    await this.teamsRepository.delete(teamId);
  }
}
