// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;

    const items = await model._nyxMarket.findAll({
      limit: limit ? Number(limit) : 20,
      order: [['timestamp', 'DESC']]
    });

    res.json(items);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
