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

    const userCheck = await model.MEMB_INFO.count({
      where: {
        memb___id: decode.username,
        jwt_token: token
      }
    });

    if (!userCheck) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({ success: 'User verified' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default verify;
