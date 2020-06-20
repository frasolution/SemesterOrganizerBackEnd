import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { CheckListItem } from './checklist-item.entity';
import { Task } from './tasks.entity';

@Entity()
export class CheckList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => CheckListItem,
    (checklistItem: CheckListItem) => checklistItem.checkList,
  )
  checkListItems: CheckListItem[];

  @OneToOne(
    () => Task,
    (task: Task) => task.checkList,
  )
  task: Task;
}
