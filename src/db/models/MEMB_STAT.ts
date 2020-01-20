import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import Character from './Character';

@Table
export default class MEMB_STAT extends Model<MEMB_STAT> {
  @HasOne(() => Character)
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
