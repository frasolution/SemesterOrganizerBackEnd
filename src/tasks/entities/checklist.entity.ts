import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CheckListItem } from './checklist-item.entity';

@Entity()
export class CheckList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => CheckListItem,
    (checklistItem: CheckListItem) => checklistItem.checkList,
  )
  checkListItems: CheckListItem[];
}
