import express from 'express';
import router from './routes/router';

const app = express();
const port = 2000;

app.use(router);

app.listen(port, () =>
  console.log('\x1b[36m', `-- server started on port ${port} --`, '\x1b[0m'),
);
