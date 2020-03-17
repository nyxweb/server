import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

interface Resource {
  group: number;
  id: number;
  level: number;
  value: number;
}

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
    const resources: Resource[] | false =
      userJSON.resources && userJSON.resources.resources
        ? JSON.parse(userJSON.resources.resources)
        : false;

    const newResources: Resource[] = JSON.parse(config.value).map(
      (r: Resource) => {
        const find =
          resources &&
          resources.find(
            re => re.group === r.group && re.id === r.id && re.level === r.level
          );
        return !resources || !find ? r : find;
      }
    );

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
    let warehouse;
    if (!userJSON.warehouse) {
      warehouse = await model.warehouse.create({
        AccountID: userJSON.memb___id,
        Items: Buffer.from('f'.repeat(3840), 'hex')
      });
    }

    warehouse = userJSON.warehouse || warehouse;
    userJSON.warehouse = {
      items: warehouse.Items.toString('hex'),
      money: warehouse.Money,
      lock: warehouse.pw !== 0
    };

    saveLog({
      account: userJSON.memb___id,
      module: 'login',
      message: `Login action was performed.`,
      ip: req.ip
    });

    res.json(userJSON);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
