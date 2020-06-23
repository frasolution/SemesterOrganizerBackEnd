import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColumnsService } from './columns.service';
import { ColumnsRepository } from './columns.repository';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnsRepository]), TasksModule],
  providers: [ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
