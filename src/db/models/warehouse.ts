import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default
} from 'sequelize-typescript';

@Table
export default class warehouse extends Model<warehouse> {
  @PrimaryKey
  @Column
  AccountID: string;

  @Column
  Items: Buffer;

  @Default(0)
  @Column
  Money: number;

  @Default(2)
  @Column
  DbVersion: number;

  @Default(0)
  @Column
  pw: number;

  @Default(1)
  @Column
  MultiVault: number;
}
