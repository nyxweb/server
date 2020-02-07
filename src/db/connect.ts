import { Sequelize } from 'sequelize-typescript';

// Models
import { Character, MEMB_STAT } from './models';

let connection;
try {
  connection = new Sequelize(
    'mssql://sa:thepasswordis1@localhost:60143/MuOnline',
    {
      repositoryMode: true,
      define: {
        freezeTableName: true,
        timestamps: false
      }
    }
  );
  console.log('DB SUCCESS');
} catch (error) {
  console.log('DB FAIL');
}

connection.addModels([Character, MEMB_STAT]);

export default connection;
