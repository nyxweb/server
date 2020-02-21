import { Sequelize } from 'sequelize-typescript';

// Models
import model from './models';

let connection: any;
try {
  connection = new Sequelize(process.env.SEQUELIZE_URL, {
    define: {
      freezeTableName: true,
      timestamps: false
    },
    logging: false,
    models: [
      model._nyxConfig,
      model._nyxResources,
      model.Character,
      model.AccountCharacter,
      model.MEMB_STAT,
      model.MEMB_INFO,
      model.Guild,
      model.GuildMember
    ]
  });

  console.log('Database connected...');
} catch (error) {
  console.log('Database failed to connect...');
}

export default connection;
