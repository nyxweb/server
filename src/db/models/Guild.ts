import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

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
}
