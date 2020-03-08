import jwt from 'jsonwebtoken';

// Types
import { Request, Response, NextFunction } from 'express';

// Tools
import logger from '../tools/logger';

// Models
import model from '../db/models';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('nyxAuthToken');

    if (!token) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const userCheck = await model.MEMB_INFO.findOne({
      where: {
        memb___id: decode.username,
        jwt_token: token
      }
    });

    if (!userCheck) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    if (Number(userCheck.bloc_code) !== 0) {
      return res.status(403).json({ error: 'This account has been blocked.' });
    }

    req.username = decode.username;
    next();
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
