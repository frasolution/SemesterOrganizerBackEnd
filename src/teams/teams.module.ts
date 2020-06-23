import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { CoursesModule } from '../courses/courses.module';
import { NotesModule } from '../notes/notes.module';
import { ColumnsModule } from '../columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamsRepository]),
    AuthModule,
    UsersModule,
    CoursesModule,
    NotesModule,
    ColumnsModule,
    TasksModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
