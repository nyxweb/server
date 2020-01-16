import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: 'sa',
  password: process.env.DB_PASS,
  dialect: 'mssql',
  models: [__dirname + '/models/'],
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

export default sequelize;
