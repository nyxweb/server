// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const exchangeOnline = async (req: Request, res: Response) => {
  try {
    const config = await model._nyxConfig.findOne({
      where: {
        name: 'online_time'
      }
    });

    if (!config) {
      return res
        .status(400)
        .json({ error: 'Could not load config online_time' });
    }

    const status = await model.MEMB_STAT.findOne({
      where: {
        memb___id: req.username
      }
    });

    const resources = await model._nyxResources.findOne({
      where: {
        account: req.username
      }
    });

    if (!status || status.TotalTime < 60) {
      return res
        .status(400)
        .json({ error: `You need at least one hour to exchange time` });
    }

    if (status.ConnectStat) {
      return res
        .status(400)
        .json({ error: `You need to be Offline to exchange time` });
    }

    if (!resources) {
      return res.status(400).json({ error: `No resources record found` });
    }

    const hours = Math.floor(status.TotalTime / 60);
    const credits = hours * Number(config.value);
    const timeLeft = status.TotalTime - hours * 60;

    status.TotalTime = timeLeft;
    await status.save();

    resources.credits += credits;
    await resources.save();

    saveLog({
      account: req.username,
      module: 'account/online',
      message: `Exchanged ${hours} hours for ${credits} credits.`,
      ip: req.ip
    });

    res.json({
      success: `You exchanged ${hours} hours and received ${credits} credits`,
      status,
      credits: resources.credits
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default exchangeOnline;
