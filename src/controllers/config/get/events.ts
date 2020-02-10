// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const events = async (req: Request, res: Response) => {
  try {
    const result = await model.Nyx_Config.findOne({
      where: {
        name: 'events'
      }
    });

    res.json(!result ? null : JSON.parse(result.value));
  } catch (error) {
    logger.error({ error, res });
  }
};

export default events;
