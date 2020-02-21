import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const verify = async (req: Request, res: Response) => {
  try {
    const token = req.header('nyxAuthToken');

    if (!token) {
      return res.json({ error: 'Not authorized' });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const user = await model.MEMB_INFO.findOne({
      where: {
        memb___id: decode.username,
        jwt_token: token
      },
      include: [{ model: model._nyxResources }]
    });

    if (!user) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(user);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default verify;
