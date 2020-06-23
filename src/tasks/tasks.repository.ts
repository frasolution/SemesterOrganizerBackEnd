import { EntityRepository, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async editTask(taskId: number, editTaskDto: CreateTaskDto): Promise<void> {
    const { title, description, dueDate, priority } = editTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    await this.update(taskId, task);
  }
}
