import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey
} from 'sequelize-typescript';

import Character from './Character';

@Table
export default class MEMB_STAT extends Model<MEMB_STAT> {
  // @ForeignKey(() => Character)
  @Column
  memb___id: string;

  @Column
  ConnectStat: number;

  @Column
  ConnectTM: string;

  @Column
  DisConnectTM: string;

  @Column
  TotalTime: number;

  // @HasMany(() => Character)
  // characters: Character[];
}
