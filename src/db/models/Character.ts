import { Table, Column, Model, HasOne, PrimaryKey } from 'sequelize-typescript';

import AccountCharacter from './AccountCharacter';
import MEMB_STAT from './MEMB_STAT';

@Table
export default class Character extends Model<Character> {
  @PrimaryKey
  @Column
  AccountID: string;

  @Column
  Name: string;

  @Column
  cLevel: string;

  // @Column
  // LevelUpPoint: number;

  @Column
  Class: number;

  @Column
  Experience: number;

  // @Column
  // Strength: number;

  // @Column
  // Dexterity: number;

  // @Column
  // Vitality: number;

  // @Column
  // Energy: number;

  // @Column
  // Leadership: number;

  @Column
  Inventory: BinaryType;

  // @Column
  // MagicList: BinaryType;

  @Column
  Money: number;

  // @Column
  // Life: number;

  // @Column
  // MaxLife: number;

  // @Column
  // Mana: number;

  // @Column
  // MaxMana: number;

  @Column
  MapNumber: number;

  @Column
  MapPosX: number;

  @Column
  MapPosY: number;

  // @Column
  // MapDir: number;

  @Column
  PkCount: number;

  @Column
  PkLevel: number;

  @Column
  PkTime: number;

  @Column
  CtlCode: number;

  @Column
  Quest: BinaryType;

  @Column
  Resets: number;

  @Column
  GrandResets: number;

  @Column
  BanPost: number;

  @Column
  IsMarried: number;

  @Column
  MarryName: string;

  @Column
  QuestNumber: number;

  @Column
  QuestMonsters: number;

  @Column
  QuestInCurse: number;

  @Column
  QuestInProgress: number;

  @Column
  IsVip: number;

  @Column
  VipExpirationTime: number;

  @Column
  SkyEventWins: number;

  @Column
  BanPostTime: string;

  @Column
  BanCharTime: string;

  @Column
  BanChatTime: string;

  @Column
  TotalTime: number;

  @Column
  HOFWins: number;

  @HasOne(() => MEMB_STAT, { sourceKey: 'AccountID', foreignKey: 'memb___id' })
  status?: MEMB_STAT;

  @HasOne(() => AccountCharacter, { sourceKey: 'Name', foreignKey: 'GameIDC' })
  account?: AccountCharacter;
}
