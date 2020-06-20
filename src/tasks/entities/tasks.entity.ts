import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from 'src/courses/courses.entity';
import { CheckList } from './checklist.entity';

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

  @OneToOne(
    () => CheckList,
    (checkList: CheckList) => checkList.task,
  )
  @JoinColumn()
  checkList: CheckList;

  @ManyToOne(
    () => Course,
    (course: Course) => course.tasks,
    { onDelete: 'CASCADE' },
  )
  course: Course;
}
