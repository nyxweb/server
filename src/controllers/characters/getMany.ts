// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import Character from '../../db/models/Character';

const getMany = async (req: Request, res: Response) => {
  try {
    const result = await Character.findAll({ limit: 10 });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
