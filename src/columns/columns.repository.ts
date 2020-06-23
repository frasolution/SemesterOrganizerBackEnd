import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Columns } from './columns.entity';
import { Task } from '../tasks/tasks.entity';
import { CreateAndUpdateTaskDto } from '../tasks/dto/create-task.dto';
import { MoveTaskDto } from '../tasks/dto/move-task.dto';

@EntityRepository(Columns)
export class ColumnsRepository extends Repository<Columns> {
  async createTask(
    columnId: number,
    createTaskDto: CreateAndUpdateTaskDto,
  ): Promise<void> {
    const { title, description, dueDate, priority } = createTaskDto;
    const task = new Task();
    const column = await this.getColumn(columnId);
    this.validateColumn(column);

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.isCompleted = false;

    try {
      column.tasks.push(task);
      column.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error while saving task for column',
      );
    }
  }

  async moveTask(moveTaskDto: MoveTaskDto): Promise<void> {
    const {
      selectedColumnId,
      title,
      description,
      dueDate,
      priority,
      isCompleted,
    } = moveTaskDto;

    // get start and destination column
    const newColumn = await this.getColumn(selectedColumnId);
    this.validateColumn(newColumn);

    // create copy of task to move
    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.isCompleted = isCompleted;

    // delete task from old column and push it to new one

    try {
      newColumn.tasks.push(task);
      newColumn.save();
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        'Error while trying to move task',
      );
    }
  }

  private async getColumn(columnId: number) {
    return await this.findOne({
      relations: ['tasks'],
      where: { id: columnId },
    });
  }

  private validateColumn(column: Columns) {
    if (!column) {
      throw new ConflictException('There is no column with the provided ID');
    }
  }
}
