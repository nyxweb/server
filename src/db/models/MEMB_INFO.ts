import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default
} from 'sequelize-typescript';

@Table
export default class MEMB_INFO extends Model<MEMB_INFO> {
  @PrimaryKey
  @Column
  memb___id: string;

  @Column
  memb__pwd: string;

  @Column
  mail_addr: string;

  @Column
  memb_name: string;

  @Default('unknown')
  @Column
  sno__numb: string;

  @Default(0)
  @Column
  bloc_code: number;

  @Default(0)
  @Column
  ctl1_code: number;

  @Default(0)
  @Column
  IsVip: number;

  @Default(0)
  @Column
  VipExpirationTime: number;

  @Column
  reg_ip: string;

  @Column
  jwt_token: string;
}
