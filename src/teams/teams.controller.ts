import { Controller, Get, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';

@Controller('teams')
export class TeamsController {

    constructor(private readonly teamService: TeamsService){}

    /**
     * @param id team with this id will be returned via api
     * 
     * returns team id as Promise
     */
    @Get(':id')
    findOne(@Param('id') id:number):Promise<Team> {
        return this.teamService.findOne(id);
    }

    /**
     * @param id team with this id will be removed
     * 
     * removes team from repository
     */
    @Delete(':id')
    remove(@Param('id') id:number):Promise<void> {
        return this.teamService.remove(id);
    }

}
