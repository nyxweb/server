import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default
} from 'sequelize-typescript';

@Table
export default class _nyxResources extends Model<_nyxResources> {
  @PrimaryKey
  @Column
  account: string;

  /** Max length: 7680 supports up to 240 items x32 hex length */
  @Default('')
  @Column
  items: string;

  @Default(0)
  @Column
  zen: number;

  @Default(0)
  @Column
  credits: number;

  @Column
  resources: string;
}
