// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';
import { Op } from 'sequelize';

// Models
import { Character } from '../../db/models';

export default async (req: Request, res: Response) => {
  try {
    const result = await Character.findAll({
      limit: 50,
      where: {
        Name: { [Op.like]: `%${req.params.name}%` }
      },
      attributes: ['Name', 'Resets']
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};
