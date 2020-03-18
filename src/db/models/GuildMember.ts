import { Table, Column, Model, PrimaryKey, HasOne } from 'sequelize-typescript';

import Character from './Character';
import Guild from './Guild';

@Table
export default class GuildMember extends Model<GuildMember> {
  @PrimaryKey
  @Column
  Name: string;

  @Column
  G_Name: string;

  @Column
  G_Level: number;

  @Column
  G_Status: number;

  @HasOne(() => Guild, { sourceKey: 'G_Name', foreignKey: 'G_Name' })
  guild: Guild;

  @HasOne(() => Character, { sourceKey: 'Name', foreignKey: 'Name' })
  character: Character;
}
