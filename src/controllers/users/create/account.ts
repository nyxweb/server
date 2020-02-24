// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';

const create = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const findUsername = await model.MEMB_INFO.findOne({
      where: { memb___id: username }
    });

    if (findUsername) {
      return res.json({ error: 'This Username has already been taken' });
    }

    const findEmail = await model.MEMB_INFO.findOne({
      where: { mail_addr: email }
    });

    if (findEmail) {
      return res.json({ error: 'This E-Mail address is already in use' });
    }

    await model._nyxResources.create({ account: username });

    await model.MEMB_INFO.create({
      memb___id: username,
      memb__pwd: password,
      mail_addr: email,
      memb_name: Date.now().toString(),
      reg_ip: req.ip
    });

    res.json({ success: 'Registration successful' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default create;
