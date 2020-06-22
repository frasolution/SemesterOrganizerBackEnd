import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ColumnsRepository } from './columns.repository';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { CreateAndUpdateColumnDto } from './dto/create-update-column.dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnsRepository)
    private columnsRepository: ColumnsRepository,
  ) {}

  async createTask(
    columnId: number,
    createTaskDto: CreateTaskDto,
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
}
