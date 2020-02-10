// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const { limit = 5, offset = 1 } = req.query;

    const result = await model.Guild.findAll({
      limit: Number(limit),
      offset: Number(offset) - 1,
      include: [
        {
          model: model.GuildMember,
          include: [
            {
              model: model.Character,
              attributes: ['Resets']
            }
          ]
        }
      ]
    });

    res.json(result);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
