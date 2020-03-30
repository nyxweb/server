// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';
import { json } from '../../../tools/json';

// Models
import model from '../../../db/models';

interface Resource {
  group: number;
  id: number;
  level: number;
  value: number;
}

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

    let notEnoughResources = false;
    const parsedResources: Resource[] = JSON.parse(resources.resources);
    const updatedResources = [...parsedResources];
    const price: Resource[] = json.parse(marketItem.price);
    if (price && typeof price === 'object' && price.length) {
      price.forEach(p => {
        const index = parsedResources.findIndex(
          r => r.group === p.group && r.id === p.id && r.level === p.level
        );

        if (index >= 0 && updatedResources[index].value >= p.value) {
          updatedResources[index] = {
            ...updatedResources[index],
            value: updatedResources[index].value - p.value
          };
        } else {
          notEnoughResources = true;
        }
      });
    }

    if (notEnoughResources) {
      return res
        .status(400)
        .json({ error: 'Not enough resources to buy this item' });
    }

    resources.items += marketItem.hex;
    resources.resources = JSON.stringify(updatedResources);

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

    const resourcesList: any = resources.toJSON();
    resourcesList.list = resourcesList.resources;
    delete resourcesList.resources;

    res.json({
      success: 'Your new item is in your Storage!',
      resources: resourcesList
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default buyMarketItem;
