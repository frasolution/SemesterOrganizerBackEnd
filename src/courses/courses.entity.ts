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
  )
  team: Team;

  @OneToMany(
    () => Note,
    note => note.course,
  )
  note: Note[];
}
