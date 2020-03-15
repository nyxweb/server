// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getOnline = async (req: Request, res: Response) => {
  try {
    const status = await model.MEMB_STAT.findOne({
      where: {
        memb___id: req.username
      }
    });

    res.json(status);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getOnline;
