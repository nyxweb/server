// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    let { page = 1, perPage = 20 } = req.query;
    page = Number(page);
    perPage = Number(perPage);

    const items = await model._nyxMarket.findAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [['timestamp', 'DESC']],
      include: [
        {
          model: model.Character,
          attributes: ['Name'],
          include: [
            {
              model: model.MEMB_STAT,
              attributes: ['ConnectStat']
            },
            {
              model: model.AccountCharacter,
              attributes: ['GameIDC']
            }
          ]
        }
      ]
    });

    const count = await model._nyxMarket.count();

    res.json({
      list: items,
      count
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
