import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamsService } from './teams.service';
import { TeamsRepository } from '../teams/teams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeamsRepository])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
