// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const { limit = 10, offset = 1 } = req.query;

    const result = await model.Character.findAll({
      limit: Number(limit),
      offset: Number(offset) - 1,
      order: [['cLevel', 'DESC']],
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
