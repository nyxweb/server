// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const postNews = async (req: Request, res: Response) => {
  try {
    if (!req.admin) {
      return res.status(403).json({ error: `You don't have access.` });
    }

    const { title, content, author } = req.body;

    await model._nyxNews.create({
      account: req.username,
      title,
      content,
      author,
      timestamp: Math.floor(Date.now() / 1000),
      ip: req.ip
    });

    res.json({ success: 'News posted successfully' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default postNews;
