import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CheckList } from './checklist.entity';
import { Columns } from 'src/columns/columns.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  isCompleted: boolean;

  @OneToOne(
    () => CheckList,
    (checkList: CheckList) => checkList.task,
  )
  @JoinColumn()
  checkList: CheckList;

  @ManyToOne(
    () => Columns,
    (columns: Columns) => columns.tasks,
    { onDelete: 'CASCADE' },
  )
  column: Columns;
}
