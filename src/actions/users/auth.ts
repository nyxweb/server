import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import { MEMB_INFO } from '../../db/models';

const auth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await MEMB_INFO.findOne({
      where: { memb___id: username, memb__pwd: password }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_KEY);

    await user.update({
      jwt_token: token
    });

    res.json({ success: 'Login successful', token });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
