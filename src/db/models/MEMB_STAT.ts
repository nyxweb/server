import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  Default
} from 'sequelize-typescript';

import Character from './Character';

@Table
export default class MEMB_STAT extends Model<MEMB_STAT> {
  @PrimaryKey
  @Column
  memb___id: string;

  @Default(0)
  @Column
  ConnectStat: number;

  @Column
  ConnectTM: string;

  @Column
  DisConnectTM: string;

  @Default(0)
  @Column
  TotalTime: number;

  @HasMany(() => Character, { sourceKey: 'memb___id', foreignKey: 'AccountID' })
  characters?: Character[];
}
