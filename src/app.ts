import express, { Application } from 'express';
import 'dotenv/config';
import './db/sequelize';

import router from './routes/router';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`\n* SERVER STARTED ON PORT [${process.env.PORT}] *\n`);
});
