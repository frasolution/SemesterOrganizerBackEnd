import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';
import { Task } from '../tasks/entities/tasks.entity';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => User,
    (user: User) => user.teams,
  )
  @JoinTable()
  users: User[];

  @OneToMany(
    () => Course,
    course => course.team,
  )
  courses: Course[];

  @OneToMany(
    () => Task,
    task => task.team,
  )
  task: Team[];
}
