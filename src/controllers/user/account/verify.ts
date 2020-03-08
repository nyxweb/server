import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { json } from '../../../tools/json';

// Models
import model from '../../../db/models';

// Config
import config from '../../../configs';

const verify = async (req: Request, res: Response) => {
  try {
    const token = req.header('nyxAuthToken');

    if (!token) {
      return res.json({ error: 'Not authorized' });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);

    const user = await model.MEMB_INFO.findOne({
      where: {
        memb___id: decode.username,
        jwt_token: token
      },
      include: [
        { model: model._nyxResources },
        { model: model.MEMB_STAT },
        { model: model.warehouse }
      ],
      attributes: [
        'memb___id',
        'memb_name',
        'sno__numb',
        'bloc_code',
        'ctl1_code',
        'IsVip',
        'VipExpirationTime',
        'reg_ip',
        'admin_lvl'
      ]
    });

    if (!user) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const userJSON: any = user.toJSON();

    // Resources
    const resources =
      userJSON.resources && userJSON.resources.resources
        ? json.parse(userJSON.resources.resources)
        : false;

    const newResources: any[] = [];

    config.user.resources.forEach((name: string) => {
      const resItem = resources
        ? resources.find((r: any) => r.name === name)
        : false;

      if (resItem) {
        newResources.push({
          name,
          value: resItem.value
        });
      } else {
        newResources.push({ name, value: 0 });
      }
    });

    if (!userJSON.resources || !userJSON.resources.resources) {
      const nyxRes = new model._nyxResources();
      nyxRes.account = user.memb___id;
      nyxRes.resources = JSON.stringify(newResources);

      await nyxRes.save();

      userJSON.resources = nyxRes.toJSON();
    }

    userJSON.resources.list = JSON.stringify(newResources);
    delete userJSON.resources.resources;
    userJSON.resources.zen = Number(userJSON.resources.zen);

    // Warehouse
    userJSON.warehouse = {
      items: userJSON.warehouse.Items.toString('hex'),
      money: userJSON.warehouse.Money,
      lock: userJSON.warehouse.pw !== 0
    };

    res.json(userJSON);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default verify;
