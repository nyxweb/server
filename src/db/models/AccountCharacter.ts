import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';

// Models
import { Character } from '.';

@Table
export default class AccountCharacter extends Model<AccountCharacter> {
  @ForeignKey(() => Character)
  @Column({ primaryKey: true })
  public Id: string;

  @Column
  public GameID1: string;

  @Column
  public GameID2: string;

  @Column
  public GameID3: string;

  @Column
  public GameID4: string;

  @Column
  public GameID5: string;

  @Column
  public GameIDC: string;
}
