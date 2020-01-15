import express, { Request, Response } from 'express';

const app = express();
const port = 2000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello!');
});

app.listen(port, () =>
  console.log('\x1b[36m', `-- server started on port ${port} --`, '\x1b[0m'),
);
