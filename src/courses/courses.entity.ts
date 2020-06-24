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
import { Columns } from 'src/columns/columns.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    () => Columns,
    columns => columns.course,
    { cascade: true },
  )
  columns: Columns[];

  @OneToMany(
    () => Note,
    note => note.course,
    { cascade: true },
  )
  notes: Note[];
}
