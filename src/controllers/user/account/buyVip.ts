// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const buyVip = async (req: Request, res: Response) => {
  try {
    const { vipDays } = req.body;

    const account = await model.MEMB_INFO.findOne({
      where: {
        memb___id: req.username
      },
      attributes: {
        exclude: ['memb__pwd']
      }
    });

    const resources = await model._nyxResources.findOne({
      where: {
        account: req.username
      }
    });

    const config = await model._nyxConfig.findOne({
      where: {
        name: 'vip'
      }
    });

    if (!account) {
      return res.status(400).json({ error: 'Could not read user data' });
    }

    if (!resources) {
      return res
        .status(400)
        .json({ error: 'Could not find resources for this user' });
    }

    if (!config) {
      return res.status(400).json({ error: 'Could not find config for VIP' });
    }

    const credits = vipDays * Number(config.value);

    if (resources.credits < credits) {
      return res.status(400).json({
        error: `You need ${credits} credits to buy vip for ${vipDays} days.`
      });
    }

    resources.credits -= credits;

    const time = vipDays * 24 * 60 * 60;
    account.VipExpirationTime = account.IsVip
      ? account.VipExpirationTime + time
      : Math.floor(Date.now() / 1000) + time;
    account.IsVip = 1;

    await Promise.all([
      resources.save(),
      account.save(),
      saveLog({
        account: req.username,
        module: 'vip',
        message: `Purchased {highlight:${vipDays}} days VIP status for {highlight:${credits}} credits.`,
        ip: req.ip
      })
    ]);

    res.json({
      success: 'You purchased VIP successfully',
      info: account,
      credits: resources.credits
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default buyVip;
