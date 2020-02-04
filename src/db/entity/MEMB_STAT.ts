import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import Character from './Character';

@Entity('MEMB_STAT')
export default class MEMB_STAT {
  @PrimaryColumn()
  memb___id: string;

  @Column()
  ConnectStat: number;

  @Column()
  ConnectTM: string;

  @Column()
  DisConnectTM: string;

  @Column()
  TotalTime: number;

  @OneToOne(
    type => Character,
    character => character.status
  )
  character: Character;
}
