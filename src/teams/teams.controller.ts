import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { GetUser } from '../auth/getUser.decorator';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';
import { CreateCoursesDto } from '../courses/dto/create-courses.dto';
import { EditTeamDto } from './dto/edit-team.dto';

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

  @Patch(':teamId')
  editTeam(
    @Param('teamId') teamId: number,
    @Body(ValidationPipe) editTeamDto: EditTeamDto,
  ): Promise<void> {
    return this.teamsService.editTeam(teamId, editTeamDto);
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
  getCourses(@Param('teamId') teamId: number): Promise<Course[]> {
    return this.teamsService.getCourses(teamId);
  }

  @Post(':teamId/courses')
  createCourses(
    @Param('teamId') teamId: number,
    @Body(ValidationPipe) createCoursesDto: CreateCoursesDto,
  ): Promise<void> {
    return this.teamsService.createCourses(teamId, createCoursesDto);
  }
}
