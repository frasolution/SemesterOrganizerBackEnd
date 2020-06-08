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

@Controller('teams')
@UseGuards(AuthGuard())
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  @Get('/')
  getTeams(@GetUser() user: User): Promise<Team[]> {
    return this.teamService.getTeams(user);
  }

  @Post('/')
  createTeam(
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.teamService.createTeam(createTeamDto, user);
  }

  /**
   * @param id team with this id will be returned via api
   *
   * returns team id as Promise
   */
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  /**
   * @param id team with this id will be removed
   *
   * removes team from repository
   */
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.teamService.remove(id);
  }
}
