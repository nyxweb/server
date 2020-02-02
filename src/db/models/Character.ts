import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';

import { MEMB_STAT, GuildMember, AccountCharacter } from '.';

@Table
export default class Character extends Model<Character> {
  @ForeignKey(() => MEMB_STAT)
  @ForeignKey(() => AccountCharacter)
  @Column({ primaryKey: true })
  public AccountID: string;

  @ForeignKey(() => GuildMember)
  @Column
  public Name: string;

  @Column
  public cLevel: number;

  @Column
  public LevelUpPoint: number;

  @Column
  public Class: number;

  @Column
  public Experience: number;

  @Column
  public Strength: number;

  @Column
  public Dexterity: number;

  @Column
  public Vitality: number;

  @Column
  public Energy: number;

  @Column
  public Leadership: number;

  @Column
  public Inventory: BinaryType;

  @Column
  public MagicList: BinaryType;

  @Column
  public Money: number;

  @Column
  public Life: number;

  @Column
  public MaxLife: number;

  @Column
  public Mana: number;

  @Column
  public MaxMana: number;

  @Column
  public MapNumber: number;

  @Column
  public MapPosX: number;

  @Column
  public MapPosY: number;

  @Column
  public MapDir: number;

  @Column
  public PkCount: number;

  @Column
  public PkLevel: number;

  @Column
  public PkTime: number;

  @Column
  public CtlCode: number;

  @Column
  public Quest: BinaryType;

  @Column
  public Resets: number;

  @Column
  public GrandResets: number;

  @Column
  public BanPost: number;

  @Column
  public IsMarried: number;

  @Column
  public MarryName: string;

  @Column
  public QuestNumber: number;

  @Column
  public QuestMonsters: number;

  @Column
  public QuestInCurse: number;

  @Column
  public QuestInProgress: number;

  @Column
  public IsVip: number;

  @Column
  public VipExpirationTime: number;

  @Column
  public SkyEventWins: number;

  @Column
  public BanPostTime: string;

  @Column
  public BanCharTime: string;

  @Column
  public BanChatTime: string;

  @Column
  public TotalTime: number;

  @HasOne(() => MEMB_STAT)
  public status: MEMB_STAT;

  @HasOne(() => AccountCharacter)
  public account: AccountCharacter;

  @BelongsTo(() => GuildMember)
  public guild: GuildMember;
}
