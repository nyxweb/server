import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('MEMB_INFO')
export default class MEMB_INFO {
  @PrimaryColumn()
  memb___id: string;

  @Column()
  memb__pwd: string;

  @Column()
  memb_name: string;

  @Column({ default: 'unknown' })
  sno__numb: string;

  @Column()
  phon_num: string;

  @Column()
  mail_addr: string;

  @Column({ default: 0 })
  bloc_code: number;

  @Column({ default: 0 })
  ctl1_code: number;

  @Column({ default: 0 })
  IsVip: number;

  @Column({ default: 0 })
  VipExpirationTime: number;

  @Column()
  addr_info: string;

  @Column()
  reg_ip: string;

  @Column()
  admin_lvl: number;

  @Column()
  jwt_token: string;
}
