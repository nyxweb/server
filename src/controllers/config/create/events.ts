// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const events = async (req: Request, res: Response) => {
  try {
    const { name, value } = req.body;

    if (typeof JSON.parse(value) !== 'object') {
      return res.json({ error: 'Invalid event data provided' });
    }

    const checkName = await model.Nyx_Config.findOne({
      where: { name }
    });

    if (checkName) {
      return res.json({ error: 'This event name is already taken' });
    }

    await model.Nyx_Config.create({
      name,
      value
    });

    res.json({ success: 'Event config created' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default events;
