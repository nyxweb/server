import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export default class _nyxMarket extends Model<_nyxMarket> {
  @PrimaryKey
  @Column
  account: string;

  @Column
  hex: string;

  @Column
  price: string;

  @Column
  name: string;

  @Column
  id: number;

  @Column
  group: number;

  @Column
  level: number;

  @Column
  exo1: number;

  @Column
  exo2: number;

  @Column
  exo3: number;

  @Column
  exo4: number;

  @Column
  exo5: number;

  @Column
  exo6: number;

  @Column
  options: number;

  @Column
  ancient: number;

  @Column
  timestamp: string;
}
