// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';
import { json } from '../../tools/json';

// Models
import model from '../../db/models';

const getConfig = async (req: Request, res: Response) => {
  try {
    const config = await model._nyxConfig.findAll();

    if (!config) {
      return res.status(400).json({ error: 'Could not load configuration' });
    }

    const configs: { [key: string]: string } = {};

    config.forEach(cfg => {
      const parsed = json.parse(cfg.value);
      if (parsed) {
        configs[cfg.name] = parsed;
      } else {
        configs[cfg.name] = cfg.value;
      }
    });

    res.json(configs);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getConfig;
