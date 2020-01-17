import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class MEMB_INFO extends Model<MEMB_INFO> {
  @Column({ primaryKey: true })
  public memb___id: string;

  @Column
  public memb__pwd: string;

  @Column
  public sno_numb: string;

  @Column
  public mail_addr: string;

  @Column
  public fpas_ques: string;

  @Column
  public fpas_answ: string;

  @Column
  public IsVip: number;

  @Column
  public VipExpirationTime: number;

  @Column
  public reg_ip: string;
}
