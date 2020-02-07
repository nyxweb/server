import { Table, Column, Model, PrimaryKey, HasOne } from 'sequelize-typescript';

import Character from './Character';

@Table
export default class AccountCharacter extends Model<AccountCharacter> {
  @PrimaryKey
  @Column
  Id: string;

  @Column
  GameID1: string;

  @Column
  GameID2: string;

  @Column
  GameID3: string;

  @Column
  GameID4: string;

  @Column
  GameID5: string;

  @Column
  GameIDC: string;

  @HasOne(() => Character, { sourceKey: 'GameIDC', foreignKey: 'Name' })
  character: Character;
}
