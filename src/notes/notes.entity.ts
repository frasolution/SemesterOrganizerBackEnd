import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Course } from '../courses/courses.entity';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @ManyToOne(
    () => Course,
    (course: Course) => course.notes,
    { onDelete: 'CASCADE' },
  )
  course: Course;
}
