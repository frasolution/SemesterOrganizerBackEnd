import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Columns } from '../columns/columns.entity';

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
  dueDate: string;

  @Column({ nullable: true })
  isCompleted: boolean;

  @ManyToOne(
    () => Columns,
    (columns: Columns) => columns.tasks,
    { onDelete: 'CASCADE' },
  )
  column: Columns;
}
