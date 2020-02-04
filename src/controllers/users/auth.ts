import { getManager } from 'typeorm';

import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

import MEMB_INFO from '../../db/entity/MEMB_INFO';

const auth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await getManager().findOne(MEMB_INFO, {
      where: { memb___id: username, memb__pwd: password }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_KEY);

    user.jwt_token = token;

    await getManager().save(user);

    res.json({ success: 'Login successful', token });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
