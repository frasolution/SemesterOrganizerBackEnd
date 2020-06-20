import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/team.entity';
import { Note } from '../notes/notes.entity';
import { Task } from 'src/tasks/entities/tasks.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseNumber: number;

  @Column()
  courseName: string;

  @Column()
  courseSemester: number;

  @Column()
  courseCP: number;

  @ManyToOne(
    () => Team,
    team => team.courses,
    { onDelete: 'CASCADE' },
  )
  team: Team;

  @OneToMany(
    () => Task,
    task => task.course,
  )
  tasks: Task[];

  @OneToMany(
    () => Note,
    note => note.course,
  )
  notes: Note[];
}
