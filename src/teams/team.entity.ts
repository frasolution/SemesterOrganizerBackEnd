import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/courses.entity';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => User)
  @JoinTable()
  members: User[];

  @ManyToOne(type => Course, course => course.team )
  course:Course[]
}
