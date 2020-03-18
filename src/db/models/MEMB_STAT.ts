import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  HasOne
} from 'sequelize-typescript';

import AccountCharacter from './AccountCharacter';

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

  @HasOne(() => AccountCharacter, { sourceKey: 'memb___id', foreignKey: 'Id' })
  account: AccountCharacter;
}
