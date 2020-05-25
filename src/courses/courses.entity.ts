import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamname: string;

  @Column()
  semester: string;

  @ManyToOne(
    type => Team,
    team => team.course,
  )
  team: Team;
}
