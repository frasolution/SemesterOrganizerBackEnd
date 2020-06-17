import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetUser } from '../auth/getUser.decorator';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';
import { CoursesService } from '../courses/courses.service';

@Controller('teams')
@UseGuards(AuthGuard())
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('/')
  getTeams(@GetUser() user: User): Promise<Team[]> {
    return this.teamsService.getTeams(user);
  }

  @Post('/')
  createTeam(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.teamsService.createTeam(createTeamDto, user);
  }

  @Get(':teamId')
  findOne(@Param('teamId') teamId: number): Promise<Team> {
    return this.teamsService.findOne(teamId);
  }

  @Delete(':teamId')
  remove(@Param('teamId') teamId: number): Promise<void> {
    return this.teamsService.remove(teamId);
  }

  @Get(':teamId/courses')
  getCoursesByTeam(@Param('teamId') teamId: number): Promise<Course[]> {
    return this.teamsService.getCoursesByTeam(teamId);
  }
}
