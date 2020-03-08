// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await model._nyxAccountLogs.findAll({
      where: {
        account: req.username
      },
      attributes: {
        exclude: ['account', 'hidden']
      },
      order: [['timestamp', 'DESC']]
    });

    res.json(logs);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getLogs;
