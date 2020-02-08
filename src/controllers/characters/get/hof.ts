import { Op } from 'sequelize';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getHof = async (req: Request, res: Response) => {
  try {
    const result = await model.Character.findAll({
      limit: 5,
      where: {
        [Op.or]: [
          { Class: 1 },
          { Class: 16 },
          { Class: 33 },
          { Class: 48 },
          { Class: 64 }
        ]
      },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
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

    res.json(result);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getHof;
