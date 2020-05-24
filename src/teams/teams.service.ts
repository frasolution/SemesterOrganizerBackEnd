import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamsRepository } from './teams.repository';
import { Team } from './team.entity';

@Injectable()
export class TeamsService {

    constructor(
        @InjectRepository(TeamsRepository)
        private teamsRepository:TeamsRepository,
    ){}


    findOne(id:number): Promise<Team>{
        return this.teamsRepository.findOne(id);
    }

    async remove(id:number): Promise<void> {
        await this.teamsRepository.delete(id);
    }

}
