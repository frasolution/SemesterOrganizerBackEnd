import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/team.entity';
import { Note } from '../notes/notes.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseName: string;

  @Column()
  semester: string;

  @ManyToOne(
    () => Team,
    team => team.courses,
  )
  @JoinTable()
  team: Team;

  @OneToMany(
    () => Note,
    note => note.course,
  )
  note: Note[];
}
