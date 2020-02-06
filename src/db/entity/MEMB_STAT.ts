import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Character from './Character';

@Entity('MEMB_STAT')
export default class MEMB_STAT {
  @PrimaryGeneratedColumn()
  memb___id: string;

  @Column()
  ConnectStat: number;

  @Column()
  ConnectTM: string;

  @Column()
  DisConnectTM: string;

  @Column()
  TotalTime: number;

  @OneToMany(
    type => Character,
    character => character.status
  )
  // @JoinColumn({ name: 'memb___id', referencedColumnName: 'AccountID' })
  characters: Character[];
}
