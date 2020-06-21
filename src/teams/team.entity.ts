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
    { cascade: true },
  )
  courses: Course[];
}
