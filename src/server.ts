import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import './db/connect';
import router from './routes/router';

const port = process.env.PORT;

const app: Application = express();

// Middlewares
app.use([
  cors(),
  express.json(),
  express.urlencoded({ extended: false }),
  router
]);

app.listen(port, () => {
  console.log(`\n* SERVER STARTED ON PORT [${port}] *\n`);
});
