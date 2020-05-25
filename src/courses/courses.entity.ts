import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseName: string;

  @Column()
  semester: string;

  @ManyToOne(
    type => Team,
    team => team.courses,
  )
  team: Team;
}
