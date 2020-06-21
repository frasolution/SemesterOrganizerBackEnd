import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';
import { Course } from 'src/courses/courses.entity';

@Entity()
export class Columns extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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
