import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasOne,
  HasMany
} from 'sequelize-typescript';

import Character from './Character';

@Table
export default class _nyxMarket extends Model<_nyxMarket> {
  @PrimaryKey
  @Column
  index: number;

  @Column
  account: string;

  @Column
  character: string;

  @Column
  hex: string;

  @Column
  price: string;

  @Column
  name: string;

  @Column
  id: number;

  @Column
  group: number;

  @Column
  level: number;

  @Column
  exo1: number;

  @Column
  exo2: number;

  @Column
  exo3: number;

  @Column
  exo4: number;

  @Column
  exo5: number;

  @Column
  exo6: number;

  @Column
  options: number;

  @Column
  ancient: number;

  @Column
  timestamp: string;

  @HasOne(() => Character, { sourceKey: 'character', foreignKey: 'Name' })
  character_: Character;
}
