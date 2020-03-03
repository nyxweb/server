// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
// import model from '../../../db/models';

const cClass = async (req: Request, res: Response) => {
  try {
    res.json({ class: 'here' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default cClass;
