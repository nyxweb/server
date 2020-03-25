// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const buyMarketItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;

    const marketItem = await model._nyxMarket.findOne({
      where: { index: itemId }
    });

    if (!marketItem) {
      return res
        .status(404)
        .json({ error: `This item was just sold, sorry. 😒` });
    }

    const resources = await model._nyxResources.findOne({
      where: { account: req.username }
    });

    if (!resources) {
      return res.status(400).json({ error: 'Resources could not be found' });
    }

    resources.items += marketItem.hex;

    await Promise.all([
      resources.save(),
      marketItem.destroy(),
      saveLog({
        account: req.username,
        module: 'market',
        message: `Item {item:${marketItem.hex}} was purchased.`,
        ip: req.ip,
        hidden: JSON.stringify({
          account: req.username,
          updatedResources: resources,
          market: marketItem
        })
      })
    ]);

    res.json({
      success: 'Your new item is in your Storage!',
      storage: resources.items
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default buyMarketItem;
