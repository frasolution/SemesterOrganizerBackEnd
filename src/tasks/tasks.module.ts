import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  controllers: [],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
