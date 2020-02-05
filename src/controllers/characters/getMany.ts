import { getRepository } from 'typeorm';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

const getMany = async (req: Request, res: Response) => {
  try {
    const result = await getRepository('Character').find({
      // select: [
      //   'Name',
      //   'Class',
      //   'cLevel',
      //   'Resets',
      //   'Money',
      //   'PkCount',
      //   'QuestNumber',
      //   'TotalTime',
      //   'HOFWins',
      //   'status'
      // ],
      relations: ['status'],
      order: {
        Resets: 'DESC'
      },
      take: 1
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
