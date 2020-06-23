import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ColumnsRepository } from './columns.repository';
import { TasksRepository } from '../tasks/tasks.repository';
import { MoveTaskDto } from '../tasks/dto/move-task.dto';
import { CreateAndUpdateTaskDto } from '../tasks/dto/create-task.dto';
import { CreateAndUpdateColumnDto } from './dto/create-update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnsRepository)
    private columnsRepository: ColumnsRepository,
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async createTask(
    columnId: number,
    createTaskDto: CreateAndUpdateTaskDto,
  ): Promise<void> {
    return await this.columnsRepository.createTask(columnId, createTaskDto);
  }

  async updateColumn(
    columnId: number,
    updateColumnDto: CreateAndUpdateColumnDto,
  ): Promise<void> {
    const { columnName } = updateColumnDto;
    await this.columnsRepository.update(columnId, { title: columnName });
  }

  async deleteCoumn(columnId: number): Promise<void> {
    await this.columnsRepository.delete(columnId);
  }

  async moveTask(
    columnId: number,
    taskId: number,
    moveTaskDto: MoveTaskDto,
  ): Promise<void> {
    const { selectedColumnId } = moveTaskDto;
    if (columnId === selectedColumnId) {
      console.log('equal lol');
      return;
    }
    await this.tasksRepository.delete(taskId);
    await this.columnsRepository.moveTask(moveTaskDto);
  }
}
