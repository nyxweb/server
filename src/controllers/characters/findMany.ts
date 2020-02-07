// Types
import { Request, Response } from 'express';
import { Op } from 'sequelize';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const findMany = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { limit = 10, offset = 1 } = req.query;

    const result = await model.Character.findAll({
      limit: Number(limit),
      offset: Number(offset) - 1,
      where: {
        Name: { [Op.like]: `%${name}%` }
      },
      attributes: {
        exclude: ['Quest', 'Inventory', 'AccountID', 'MapPosX', 'MapPosY']
      },
      include: [
        {
          model: model.MEMB_STAT,
          attributes: {
            exclude: ['memb___id']
          }
        },
        {
          model: model.AccountCharacter,
          attributes: {
            exclude: ['Id']
          }
        }
      ]
    });

    res.json(result.length ? result : { error: 'No results' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default findMany;
