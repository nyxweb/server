// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const getConfig = async (req: Request, res: Response) => {
  try {
    const config = await model._nyxConfig.findAll();

    if (!config) {
      return res.status(400).json({ error: `Couldn't load config` });
    }

    res.json(config);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getConfig;
