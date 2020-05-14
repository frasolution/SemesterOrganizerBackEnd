import { Repository, EntityRepository } from 'typeorm';
import { Team } from './team.entity';

@EntityRepository(Team)
export class TeamsRepository extends Repository<Team> {}
