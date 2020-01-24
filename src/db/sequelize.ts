import { Sequelize } from 'sequelize-typescript';

// Models
import { Character, MEMB_INFO, MEMB_STAT } from './models';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: 'sa',
  password: process.env.DB_PASS,
  dialect: 'mssql',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

sequelize.addModels([Character, MEMB_INFO, MEMB_STAT]);

export default sequelize;
