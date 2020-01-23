import express, { Application } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import './db/sequelize';

import router from './routes/router';

const app: Application = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`\n * SERVER STARTED ON PORT ${port} *\n`));
