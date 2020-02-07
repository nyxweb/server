import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export default class MEMB_INFO extends Model<MEMB_INFO> {
  @PrimaryKey
  @Column
  memb___id: string;

  @Column
  memb__pwd: string;

  @Column
  memb_name: string;

  @Column
  sno__numb: string;

  @Column
  bloc_code: number;

  @Column
  ctl1_code: number;

  @Column
  IsVip: number;

  @Column
  VipExpirationTime: number;

  @Column
  reg_ip: string;

  @Column
  jwt_token: string;
}
