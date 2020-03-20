// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { json } from '../../../tools/json';
import { findAndRemove } from '../../../tools/items';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

interface Resource {
  group: number;
  id: number;
  level: number;
  value: number;
}

const deposit = async (req: Request, res: Response) => {
  try {
    const deposits: Resource[] | undefined = req.body.deposits;

    const _config = await model._nyxConfig.findOne({
      where: { name: 'resources' }
    });
    const config: Resource[] = json.parse(_config.value);

    if (!_config || !config) {
      return res.status(400).json({ error: 'Config resources not found.' });
    }

    const modelResources = await model._nyxResources.findOne({
      where: { account: req.username }
    });
    const oldResources = json.parse(modelResources.resources);
    let resourcesList: Resource[] = json.parse(modelResources.resources);

    if (!modelResources || !resourcesList) {
      return res.status(400).json({ error: `Couldn't find user resources.` });
    }

    let count = 0;
    let status = true;
    config.forEach(c => {
      const find = deposits.find(
        d => d.group === c.group && d.id === c.id && d.level === c.level
      );
      count += find.value;

      if (!find || typeof find.value !== 'number') {
        status = false;
      }
    });

    if ((config.length !== deposits.length || !status) && deposits) {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }

    if (!count && deposits) {
      return res
        .status(400)
        .json({ error: 'Please select something to deposit.' });
    }

    if (count > 120) {
      return res
        .status(400)
        .json({ error: 'Invalid amount of resources requested for deposit.' });
    }

    const warehouse = await model.warehouse.findOne({
      where: { AccountID: req.username }
    });

    if (!warehouse || !warehouse.Items) {
      return res.status(400).json({ error: 'User warehouse not found.' });
    }

    const warehouseItems = warehouse.Items.toString('hex');

    const { itemsHex, resList, foundCount } = findAndRemove(
      warehouseItems,
      deposits || config
    );

    if (itemsHex.length !== warehouseItems.length) {
      return res.status(400).json({
        error:
          'An error occured with your warehouse items, please try again later.'
      });
    }

    if (!foundCount || itemsHex === warehouseItems) {
      return res.status(400).json({
        error: `We couldn't find any resources to deposit.`
      });
    }

    resourcesList = resourcesList.map(reso => {
      const find = resList.find(
        r =>
          r.group === reso.group && r.id === reso.id && r.level === reso.level
      );

      return {
        ...reso,
        value: find ? reso.value + find.value : reso.value
      };
    });

    warehouse.Items = Buffer.from(itemsHex, 'hex');
    modelResources.resources = JSON.stringify(resourcesList);

    await Promise.all([
      warehouse.save(),
      modelResources.save(),
      saveLog({
        account: req.username,
        module: 'deposit',
        message: `Total of {highlight:${foundCount}} resources were deposit.`,
        ip: req.ip,
        hidden: JSON.stringify({
          account: req.username,
          updatedResources: resourcesList,
          oldResources,
          request: deposits
        })
      })
    ]);

    if (count && count !== foundCount) {
      res.json({
        success: `Deposit ${foundCount} resources from your warehouse successfully.`
      });
    } else {
      res.json({
        success: `We found and deposit ${foundCount} resources from your warehouse.`
      });
    }
  } catch (error) {
    logger.error({ error, res });
  }
};

export default deposit;
