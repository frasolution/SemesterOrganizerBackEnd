import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { CheckList } from '../checklists/checklists.entity';

Entity();
export class CheckListItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(
    () => CheckList,
    (checkList: CheckList) => checkList.checkListItems,
  )
  @JoinTable()
  checkList: CheckList;
}
