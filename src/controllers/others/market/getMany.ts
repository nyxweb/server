// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getMany = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;

    const items = await model._nyxMarket.findAll({
      order: [['timestamp', 'DESC']],
      limit: limit ? Number(limit) : 30,
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
      // raw: true
    });

    // const character = await model.Character.findOne({
    //   attributes: ['Name'],
    //   order: [
    //     ['mainCharacter', 'DESC'],
    //     ['Resets', 'DESC'],
    //     ['cLevel', 'DESC']
    //   ],
    //   include: [
    //     {
    //       model: model.MEMB_STAT,
    //       attributes: ['ConnectStat']
    //     },
    //     {
    //       model: model.AccountCharacter,
    //       attributes: ['GameIDC']
    //     }
    //   ]
    // });

    res.json(items);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getMany;
