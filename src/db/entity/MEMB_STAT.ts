import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
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
    character => character.AccountID
  )
  // @JoinColumn({ name: 'memb___id', referencedColumnName: 'AccountID' })
  characters: Character[];
}