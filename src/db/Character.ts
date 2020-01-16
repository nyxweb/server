// import { DataTypes, Model, BuildOptions } from 'sequelize';
// import sequelize from '../sequelize';

// export default () => {
//   interface ICharacter extends Model {
//     readonly AccountID: string;
//     Name: string;
//     Resets: number;
//     Class: number;
//     cLevel: number;
//     LevelUpPoint: number;
//     Strength: number;
//     Dexterity: number;
//     Vitality: number;
//     Energy: number;
//     Leadership: number;
//     Money: number;
//     Experience: number;
//     Inventory: string;
//     PkCount: number;
//     PkLevel: number;
//     PkTime: number;
//     QuestNumber: number;
//     SkyEventWins: number;
//   }

//   // Need to declare the static model so `findOne` etc. use correct types.
//   type MyModelStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): ICharacter;
//   };

//   return <MyModelStatic>sequelize.define(
//     'Character',
//     {
//       AccountID: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//       },
//       Name: {
//         type: DataTypes.STRING,
//       },
//       Resets: {
//         type: DataTypes.INTEGER,
//       },
//       Class: {
//         type: DataTypes.INTEGER,
//       },
//       cLevel: {
//         type: DataTypes.INTEGER,
//       },
//       LevelUpPoint: {
//         type: DataTypes.INTEGER,
//       },
//       Strength: {
//         type: DataTypes.INTEGER,
//       },
//       Dexterity: {
//         type: DataTypes.INTEGER,
//       },
//       Vitality: {
//         type: DataTypes.INTEGER,
//       },
//       Energy: {
//         type: DataTypes.INTEGER,
//       },
//       Leadership: {
//         type: DataTypes.INTEGER,
//       },
//       Money: {
//         type: DataTypes.INTEGER,
//       },
//       Experience: {
//         type: DataTypes.INTEGER,
//       },
//       Inventory: {
//         type: DataTypes.STRING(2400).BINARY,
//       },
//       PkCount: {
//         type: DataTypes.INTEGER,
//       },
//       PkLevel: {
//         type: DataTypes.INTEGER,
//       },
//       PkTime: {
//         type: DataTypes.INTEGER,
//       },
//       QuestNumber: {
//         type: DataTypes.INTEGER,
//       },
//       SkyEventWins: {
//         type: DataTypes.INTEGER,
//       },
//     },
//     {
//       freezeTableName: true,
//       timestamps: false,
//     },
//   );
// };
