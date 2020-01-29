// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import { Character, MEMB_STAT } from '../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const result = await Character.findAll({
      limit: 5,
      attributes: ['Name', 'Resets'],
      order: [[{ model: MEMB_STAT, as: 'status' }, 'TotalTime', 'DESC']],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat', 'ConnectTM', 'DisConnectTM', 'TotalTime']
        }
      ]
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
