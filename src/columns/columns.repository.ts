import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Columns } from './columns.entity';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { Task } from '../tasks/tasks.entity';

@EntityRepository(Columns)
export class ColumnsRepository extends Repository<Columns> {
  async createTask(
    columnId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<void> {
    const { title, description } = createTaskDto;
    const task = new Task();
    const column = await this.getColumn(columnId);
    this.validateColumn(column);

    task.title = title;
    task.description = description;

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
