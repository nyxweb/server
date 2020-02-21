import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export default class _nyxResources extends Model<_nyxResources> {
  @PrimaryKey
  @Column
  account: string;

  /** Max length: 7680 supports up to 240 items x32 hex length */
  @Column
  storage: string;

  @Column
  zen: number;

  @Column
  credits: number;

  @Column
  chaos: number;

  @Column
  bless: number;

  @Column
  soul: number;

  @Column
  life: number;

  @Column
  creation: number;

  @Column
  stone: number;

  @Column
  rena: number;

  @Column
  guardian: number;

  @Column
  satan: number;

  @Column
  angel: number;

  /** Horn of Unilia */
  @Column
  unilia: number;

  /** Dinorat */
  @Column
  dino: number;

  /** Box of Kundun +1 */
  @Column
  bok1: number;

  /** Box of Kundun +2 */
  @Column
  bok2: number;

  /** Box of Kundun +3 */
  @Column
  bok3: number;

  /** Box of Kundun +4 */
  @Column
  bok4: number;

  /** Box of Kundun +5 */
  @Column
  bok5: number;

  /** Box of Heaven */
  @Column
  boh: number;

  /** Box of Luck */
  @Column
  bol: number;

  /** Heart of love */
  @Column
  heart: number;
}
