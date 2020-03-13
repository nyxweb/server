import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { json } from '../../../tools/json';

// Models
import model from '../../../db/models';

const auth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await model.MEMB_INFO.findOne({
      where: { memb___id: username, memb__pwd: password },
      include: [
        { model: model._nyxResources },
        { model: model.MEMB_STAT },
        { model: model.warehouse }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const config = await model._nyxConfig.findOne({
      where: {
        name: 'resources'
      }
    });

    if (!config) {
      return res.status(400).json({ error: 'Resources config not found' });
    }

    const token = jwt.sign({ username }, process.env.JWT_KEY);

    user.jwt_token = token;

    await user.save();

    const userJSON: any = user.toJSON();

    // Resources
    const resources =
      userJSON.resources && userJSON.resources.resources
        ? json.parse(userJSON.resources.resources)
        : false;

    const newResources: any[] = [];

    JSON.parse(config.value).forEach((name: string) => {
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
      const newRes = await model._nyxResources.create({
        account: user.memb___id,
        resources: JSON.stringify(newResources)
      });

      userJSON.resources = newRes.toJSON();
    }

    userJSON.resources.list = JSON.stringify(newResources);
    delete userJSON.resources.resources;

    // Warehouse
    let newWarehouse;
    if (!userJSON.warehouse) {
      newWarehouse = model.warehouse.create({
        AccountID: userJSON.memb___id
      });
    }

    newWarehouse = userJSON.warehouse || newWarehouse;
    userJSON.warehouse = {
      items: newWarehouse.Items.toString('hex'),
      money: newWarehouse.Money,
      lock: newWarehouse.pw !== 0
    };

    res.json(userJSON);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
