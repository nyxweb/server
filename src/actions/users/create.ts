// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import { MEMB_INFO } from '../../db/models';

const create = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const findUsername = await MEMB_INFO.findByPk(username);
    const findEmail = await MEMB_INFO.findOne({ where: { mail_addr: email } });

    if (findUsername) {
      return res.json({ error: 'This Username has already been taken' });
    }

    if (findEmail) {
      return res.json({ error: 'This E-Mail address is already in use' });
    }

    await MEMB_INFO.create({
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
