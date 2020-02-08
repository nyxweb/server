import { Table, Column, Model, PrimaryKey, HasOne } from 'sequelize-typescript';

@Table
export default class Nyx_Config extends Model<Nyx_Config> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  value: string;
}
