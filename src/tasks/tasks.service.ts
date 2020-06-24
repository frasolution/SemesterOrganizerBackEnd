import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TasksRepository } from './tasks.repository';
import { CreateAndUpdateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async deleteTask(taskId: number): Promise<void> {
    await this.tasksRepository.delete(taskId);
  }

  async updateTask(
    taskId: string,
    updateTaskDto: CreateAndUpdateTaskDto,
  ): Promise<void> {
    const { title, description, dueDate, priority } = updateTaskDto;
    await this.tasksRepository.update(taskId, {
      title,
      description,
      dueDate,
      priority,
    });
  }

  async completeTask(
    taskId: string,
    body: { isCompleted: boolean },
  ): Promise<void> {
    await this.tasksRepository.update(taskId, {
      isCompleted: !body.isCompleted,
    });
  }
}
