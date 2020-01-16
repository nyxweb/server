import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Character extends Model<Character> {
  @Column
  public AccountID: string;

  @Column
  public Name: string;

  @Column
  public Resets: number;
}
