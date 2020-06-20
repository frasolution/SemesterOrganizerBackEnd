import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamsRepository]),
    UsersModule,
    AuthModule,
    CoursesModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
