import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TasksRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async findTask(taskId: number): Promise<Task> {
    return await this.tasksRepository.findOne(taskId);
  }

  async removeTask(taskId: number): Promise<void> {
    await this.tasksRepository.delete(taskId);
  }

  async updateTask(taskId: number, editTaskDto: CreateTaskDto): Promise<void> {
    return await this.tasksRepository.editTask(taskId, editTaskDto);
  }
}
