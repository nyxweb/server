import { createLogger, format, transports } from 'winston';
import { Response } from 'express';

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(data => `${data.timestamp}: ${data.message}`)
  ),
  transports: [new transports.File({ filename: 'logs/errors.log' })]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf(
          data => `${data.timestamp} [${data.level}]: ${data.message}`
        )
      )
    })
  );
}

interface Params {
  error: {
    message: string;
  };
  res: Response;
}

const error = ({ error: { message }, res }: Params) => {
  logger.error(message);
  res.status(500).json({ error: 'Server Error' });
};

export default { error };
