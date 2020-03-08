// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
// import model from '../../../db/models';

const quests = async (req: Request, res: Response) => {
  try {
    res.json({ quests: 'here' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default quests;
