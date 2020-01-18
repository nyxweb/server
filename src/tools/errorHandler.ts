import { Response } from 'express';
import fs from 'fs';

interface IProps {
  res: Response;
  error: {
    message: string;
  };
  __filename?: string;
}

export default (props: IProps) => {
  const {
    res,
    error: { message },
    __filename,
  } = props;

  const date = new Date();
  const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const errorMessage = `[${time}] Error: ${message} in ${__filename}\n`;

  fs.mkdir('logs', () => {
    fs.appendFile('logs/errors.log', errorMessage, (err): void => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `\n\x1b[31m   error:\x1b[33m ${message}`,
      `${__filename ? `\n   \x1b[31mat\x1b[33m ${__filename}` : ''}\x1b[0m\n`,
    );
  }

  res.json({ error: 'Server Error' });
};
