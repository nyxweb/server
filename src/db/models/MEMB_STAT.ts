import { Table, Column, Model, HasMany } from 'sequelize-typescript';

// Models
import Character from './Character';

@Table
export default class MEMB_STAT extends Model<MEMB_STAT> {
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

  @HasMany(() => Character)
  public characters: Character[];
}
