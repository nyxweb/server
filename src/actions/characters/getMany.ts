import { Request, Response } from 'express';
import errorHandler from '../../tools/errorHandler';

// Models
import Character from '../../db/models/Character';
import MEMB_STAT from '../../db/models/MEMB_STAT';

export default async (req: Request, res: Response) => {
  try {
    const getAll = await Character.findAll({
      limit: 1,
      attributes: ['Name', 'Resets'],
      include: [
        {
          model: MEMB_STAT,
          attributes: ['ConnectStat', 'ConnectTM', 'DisConnectTM', 'TotalTime']
        }
      ]
    });

    res.json(getAll);
  } catch (error) {
    errorHandler({ res, error, __filename });
  }
};
