// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const changePassword = async (req: Request, res: Response) => {
  try {
    const { password, newPassword } = req.body;

    const account = await model.MEMB_INFO.findOne({
      where: {
        memb___id: req.username,
        memb__pwd: password
      }
    });

    if (!account) {
      return res.json({ error: 'The password you entered is incorrect.' });
    }

    const oldPassword = account.memb__pwd;
    account.memb__pwd = newPassword;

    await Promise.all([
      account.save(),
      saveLog({
        account: req.username,
        module: 'password',
        message: `Password was changed.`,
        hidden: `old: ${oldPassword} new: ${password}`,
        ip: req.ip
      })
    ]);

    res.json({ success: 'Your password was successfully changed!' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default changePassword;
