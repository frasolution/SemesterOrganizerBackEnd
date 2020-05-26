import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CheckListItem } from '../checkListItems/checkListItems.entity';

@Entity()
export class CheckList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => CheckListItem,
    checklistItem => checklistItem,
  )
  checkListItems: CheckListItem[];
}
