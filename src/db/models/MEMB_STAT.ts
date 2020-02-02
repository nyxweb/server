import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

// Models
import { Character } from '.';

@Table
export default class MEMB_STAT extends Model<MEMB_STAT> {
  @ForeignKey(() => Character)
  @Column({ primaryKey: true })
  public memb___id: string;

  @Column
  public ConnectStat: number;

  @Column
  public ConnectTM: string;

  @Column
  public DisConnectTM: string;

  @Column
  public TotalTime: number;
}
