import express from 'express';
import './db/sequelize';
import router from './routes/router';

const app = express();
const port = 2000;

app.use(router);

app.listen(port, () =>
  console.log('\x1b[36m', `SERVER STARTED (PORT: ${port})`, '\x1b[0m'),
);
