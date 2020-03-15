// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const getChars = async (req: Request, res: Response) => {
  try {
    const { perPage = 20, page = 1, class: Class } = req.query;

    let where = {};
    if (Class) {
      where = { Class };
    }

    const result = await model.Character.findAll({
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
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

export default getChars;
