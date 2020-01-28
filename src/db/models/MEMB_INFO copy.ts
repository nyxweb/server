import { Table, Column, Model, Default } from 'sequelize-typescript';

@Table
export default class MEMB_INFO extends Model<MEMB_INFO> {
  @Column({ primaryKey: true })
  public memb___id: string;

  @Column
  public memb__pwd: string;

  @Column
  public jwt_token: string;

  @Column
  public memb_name: string;

  @Default('unknown')
  @Column
  public sno__numb: string;

  @Column
  public mail_addr: string;

  @Column
  public fpas_ques: string;

  @Column
  public fpas_answ: string;

  @Default(0)
  @Column
  public bloc_code: number;

  @Default(0)
  @Column
  public ctl1_code: number;

  @Default(0)
  @Column
  public IsVip: number;

  @Default(0)
  @Column
  public VipExpirationTime: number;

  @Column
  public reg_ip: string;

  @Column
  public admin_lvl: number;
}
