import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import './db/connect';

import router from './routes/router';

const app: Application = express();

// Middlewares
app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  router
]);

app.listen(process.env.PORT, () => {
  console.log(`\n* SERVER STARTED ON PORT [${process.env.PORT}] *\n`);
});
