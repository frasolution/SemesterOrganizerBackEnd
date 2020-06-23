import { Repository, EntityRepository } from 'typeorm';

import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}
