import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export default class _nyxConfig extends Model<_nyxConfig> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  value: string;
}
