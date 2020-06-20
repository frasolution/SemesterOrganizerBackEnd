import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Team } from '../../teams/team.entity';
import { Course } from 'src/courses/courses.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: number;

  @Column()
  dueDate: Date;

  @Column()
  isCompleted: boolean;

  @ManyToOne(
    () => Course,
    (course: Course) => course.tasks,
    { onDelete: 'CASCADE' },
  )
  course: Course;
}
