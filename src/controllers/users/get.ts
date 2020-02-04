import { getManager } from 'typeorm';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

const get = async (req: Request, res: Response) => {
  try {
    const result = await getManager().find('MEMB_INFO', {
      take: 5,
      select: ['memb___id', 'mail_addr']
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default get;
