import { Request, Response } from 'express';
import errorHandler from '../../tools/errorHandler';

// Models
import MEMB_INFO from '../../db/models/MEMB_INFO';

export default async (req: Request, res: Response) => {
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

    // Creating new user
    const User = MEMB_INFO.build();

    User.memb___id = username;
    User.memb__pwd = password;
    User.mail_addr = email;
    User.memb_name = Date.now().toString();
    User.reg_ip = req.ip;

    await User.save();

    res.json({ success: 'Registration successful' });
  } catch (error) {
    errorHandler({ res, error, __filename });
  }
};
