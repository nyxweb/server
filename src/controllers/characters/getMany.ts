import { getManager } from 'typeorm';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

const getMany = async (req: Request, res: Response) => {
  try {
    const result = await getManager().find('Character', {
      take: 20,
      select: [
        'Name',
        'Class',
        'cLevel',
        'Resets',
        'Money',
        'PkCount',
        'QuestNumber',
        'TotalTime',
        'HOFWins'
      ],
      order: {
        Resets: 'DESC'
      },
      relations: ['MEMB_STAT']
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
