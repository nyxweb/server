// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const getNews = async (req: Request, res: Response) => {
  try {
    const news = await model._nyxNews.findAll({
      order: [['timestamp', 'DESC']],
      attributes: {
        exclude: ['account', 'ip']
      }
    });

    res.json(news);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getNews;
