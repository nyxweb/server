// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../../tools/logger';

// Models
// import model from '../../../../db/models';

const getBidders = async (req: Request, res: Response) => {
  try {
    res.json({ getBidders: 'here' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getBidders;
