import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Entity,
  CreateDateColumn,
} from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { Course } from '../courses/courses.entity';

@Entity()
export class Columns extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @ManyToOne(
    () => Course,
    course => course.columns,
    { onDelete: 'CASCADE' },
  )
  course: Course;

  @OneToMany(
    () => Task,
    task => task.column,
    { cascade: true },
  )
  tasks: Task[];
}
