// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const latest = async (req: Request, res: Response) => {
  try {
    const items = await model._nyxMarket.findAll({
      order: [['timestamp', 'DESC']]
    });

    res.json(items || null);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default latest;
