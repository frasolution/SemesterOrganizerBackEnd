import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Course } from '../courses/courses.entity';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  title: string;

  @ManyToOne(
    () => Course,
    (course: Course) => course.note,
  )
  @JoinTable()
  course: Course;
}
