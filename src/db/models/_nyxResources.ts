import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export default class _nyxResources extends Model<_nyxResources> {
  @PrimaryKey
  @Column
  account: string;

  /** Max length: 7680 supports up to 240 items x32 hex length */
  @Column
  items: string;

  @Column
  zen: number;

  @Column
  credits: number;

  @Column
  resources: string;
}
