import DataTypes from 'sequelize';
import sequelize from '../sequelize';

export default () =>
  sequelize.define(
    'Character',
    {
      AccountID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
      },
      Resets: {
        type: DataTypes.INTEGER,
      },
      Class: {
        type: DataTypes.INTEGER,
      },
      cLevel: {
        type: DataTypes.INTEGER,
      },
      LevelUpPoint: {
        type: DataTypes.INTEGER,
      },
      Strength: {
        type: DataTypes.INTEGER,
      },
      Dexterity: {
        type: DataTypes.INTEGER,
      },
      Vitality: {
        type: DataTypes.INTEGER,
      },
      Energy: {
        type: DataTypes.INTEGER,
      },
      Leadership: {
        type: DataTypes.INTEGER,
      },
      Money: {
        type: DataTypes.INTEGER,
      },
      Experience: {
        type: DataTypes.INTEGER,
      },
      Inventory: {
        type: DataTypes.STRING.BINARY,
      },
      PkCount: {
        type: DataTypes.INTEGER,
      },
      PkLevel: {
        type: DataTypes.INTEGER,
      },
      PkTime: {
        type: DataTypes.INTEGER,
      },
      QuestNumber: {
        type: DataTypes.INTEGER,
      },
      SkyEventWins: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
