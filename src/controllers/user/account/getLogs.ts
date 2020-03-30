// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const getLogs = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 20);

    let where: any = { account: req.username };
    if (req.query.category) {
      where = { ...where, module: req.query.category };
    }

    const result = await model._nyxAccountLogs.findAndCountAll({
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: {
        exclude: ['account', 'hidden']
      },
      order: [['timestamp', 'DESC']]
    });

    res.json({
      list: result.rows,
      count: result.count
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getLogs;
