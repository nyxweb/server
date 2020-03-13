import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default
} from 'sequelize-typescript';

const date = new Date();

const defaultItems = Buffer.from('f'.repeat(3840));
const dateCreated = `${date.getFullYear()}-${date.getMonth() +
  1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

@Table
export default class warehouse extends Model<warehouse> {
  @PrimaryKey
  @Column
  AccountID: string;

  @Default(defaultItems)
  @Column
  Items: Buffer;

  @Default(0)
  @Column
  Money: number;

  @Default(dateCreated)
  @Column
  EndUseDate: Date;

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
