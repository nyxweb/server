import jwt from 'jsonwebtoken';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { json } from '../../../tools/json';

import model from '../../../db/models';

// Config
import config from '../../../configs';

const auth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await model.MEMB_INFO.findOne({
      where: { memb___id: username, memb__pwd: password },
      include: [{ model: model._nyxResources }, { model: model.MEMB_STAT }]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_KEY);

    user.jwt_token = token;

    await user.save();

    const userJSON: any = user.toJSON();

    // Resources
    const resources = json.parse(userJSON.resources.resources);
    const newResources: any[] = [];

    config.user.resources.forEach((name: string) => {
      if (resources && resources.includes(name)) {
        newResources.push({
          name,
          value: resources[name]
        });
      } else {
        newResources.push({ name, value: 0 });
      }
    });

    userJSON.resources.list = JSON.stringify(newResources);
    delete userJSON.resources.resources;

    res.json(userJSON);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default auth;
