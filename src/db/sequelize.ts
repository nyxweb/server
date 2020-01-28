import { Sequelize } from 'sequelize-typescript';

// Models
import { Character, MEMB_INFO, MEMB_STAT } from './models';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mssql',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

sequelize.addModels([Character, MEMB_INFO, MEMB_STAT]);

export default sequelize;
