import {
  Table,
  Column,
  Model,
  HasMany,
  ForeignKey
} from 'sequelize-typescript';

// Models
import { GuildMember } from '.';

@Table
export default class Guild extends Model<Guild> {
  @ForeignKey(() => GuildMember)
  @Column({ primaryKey: true })
  public G_Name: string;

  @Column
  public G_Mark: string;

  @Column
  public G_Score: number;

  @Column
  public G_Master: string;

  @Column
  public G_Notice: string;

  @HasMany(() => GuildMember)
  public GuildMember: GuildMember[];
}
