import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany
} from 'sequelize-typescript';
import GuildMember from './GuildMember';

@Table
export default class Guild extends Model<Guild> {
  @PrimaryKey
  @Column
  G_Name: string;

  @Column
  G_Mark: BinaryType;

  @Column
  G_Score: number;

  @Column
  G_Master: string;

  @Column
  G_Count: number;

  @Column
  Number: number;

  @Column
  G_Type: number;

  @Column
  G_Rival: number;

  @Column
  G_Union: number;

  @HasMany(() => GuildMember, { sourceKey: 'G_Name', foreignKey: 'G_Name' })
  members: GuildMember[];

  @HasMany(() => Guild, { sourceKey: 'G_Union', foreignKey: 'G_Union' })
  alliance: Guild[];
}
