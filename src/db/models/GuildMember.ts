import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

// Models
import { Character, Guild } from '.';

@Table
export default class GuildMember extends Model<GuildMember> {
  @ForeignKey(() => Character)
  @Column({ primaryKey: true })
  public Name: string;

  @ForeignKey(() => Guild)
  @Column
  public G_Name: string;

  @Column
  public G_Level: number;

  @Column
  public G_Status: number;

  @BelongsTo(() => Guild)
  public guild: Guild;
}
