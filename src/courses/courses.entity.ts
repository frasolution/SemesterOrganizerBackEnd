import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teamname: string;

  //DISPUTABLE
  @Column()
  semester: string;

  @OneToMany(
    type => Team,
    team => team.course,
  )
  team: Team;
}
