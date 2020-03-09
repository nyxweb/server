// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getOnline = async (req: Request, res: Response) => {
  try {
    const account = await model.MEMB_INFO.findOne({
      where: {
        memb___id: req.username
      },
      attributes: {
        exclude: ['memb__pwd']
      }
    });

    if (!account) {
      return res.status(400).json({ error: `Could'nt load data` });
    }

    res.json(account);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getOnline;
