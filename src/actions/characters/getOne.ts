// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import { Character } from '../../db/models';

const getOne = async (req: Request, res: Response) => {
  try {
    const result = await Character.findOne({
      where: {
        Name: req.params.name
      },
      attributes: ['Name', 'Resets']
    });

    res.json(result || { error: 'No result' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getOne;
