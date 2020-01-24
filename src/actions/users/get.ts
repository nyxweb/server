// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import { MEMB_INFO } from '../../db/models';

export default async (req: Request, res: Response) => {
  try {
    const result = await MEMB_INFO.findAll({
      limit: 5,
      attributes: ['memb___id', 'mail_addr']
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};
