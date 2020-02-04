import jwt from 'jsonwebtoken';
import { getManager } from 'typeorm';

// Types
import { Request, Response, NextFunction } from 'express';

// Tools
import logger from '../tools/logger';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('nyxAuthToken');

    if (!token) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const userCheck = await getManager().count('MEMB_INFO', {
      where: {
        memb___id: decode.username,
        jwt_token: token
      }
    });

    if (!userCheck) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    req.username = decode.username;
    next();
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
