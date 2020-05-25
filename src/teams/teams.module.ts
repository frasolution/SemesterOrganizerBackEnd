import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamsRepository]),
    UsersModule,
    AuthModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
