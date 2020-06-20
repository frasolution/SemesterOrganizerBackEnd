import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Team } from '../../teams/team.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: number;

  @Column()
  dueDate: Date;
}
