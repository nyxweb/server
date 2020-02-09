// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const { limit = 10, offset = 1, class: Class } = req.query;

    let where = {};
    if (Class) {
      where = { Class };
    }

    const result = await model.Character.findAll({
      where,
      limit: Number(limit),
      offset: Number(offset) - 1,
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC'],
        ['Name', 'ASC']
      ],
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
        },
        {
          model: model.GuildMember,
          include: [
            {
              model: model.Guild
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
