// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { json } from '../../../tools/json';
import { insertResources } from '../../../tools/items';
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
    const withdraws: Resource[] = req.body.withdraws;

    const _itemsDB = await model._nyxConfig.findOne({
      where: { name: 'itemsList' }
    });
    const itemsDB = json.parse(_itemsDB.value);

    if (!_itemsDB || !itemsDB) {
      return res.status(400).json({ error: 'Config itemsList not found.' });
    }

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
      const find = withdraws.find(
        d => d.group === c.group && d.id === c.id && d.level === c.level
      );
      count += find.value;

      if (!find || typeof find.value !== 'number') {
        status = false;
      }
    });

    if (!count) {
      return res
        .status(400)
        .json({ error: 'Please select something to withdraw.' });
    }

    if (!withdraws || !status || config.length !== withdraws.length) {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }

    if (count > 120) {
      return res
        .status(400)
        .json({ error: 'Invalid amount of resources requested for withdraw.' });
    }

    let enough = true;
    withdraws.forEach(w => {
      const find = resourcesList.find(
        r => r.group === w.group && r.id === w.id && r.level === w.level
      );

      if (!find || find.value < w.value) {
        enough = false;
      }
    });

    if (!enough) {
      return res.status(400).json({
        error: `You don't have that much resources.`
      });
    }

    const warehouse = await model.warehouse.findOne({
      where: { AccountID: req.username }
    });

    if (!warehouse || !warehouse.Items) {
      return res.status(400).json({ error: 'User warehouse not found.' });
    }

    const warehouseItems = warehouse.Items.toString('hex');

    const { itemsHex, resList, insertCount } = insertResources(
      warehouseItems,
      itemsDB,
      withdraws
    );

    if (itemsHex.length !== warehouseItems.length) {
      return res.status(400).json({
        error:
          'An error occured with your warehouse items, please try again later.'
      });
    }

    if (!insertCount || itemsHex === warehouseItems) {
      return res.status(400).json({
        error: `Looks like you don't have space in your warehouse.`
      });
    }

    resourcesList = resourcesList.map(reso => {
      const find = resList.find(
        r =>
          r.group === reso.group && r.id === reso.id && r.level === reso.level
      );

      return {
        ...reso,
        value: find ? reso.value - find.value : reso.value
      };
    });

    warehouse.Items = Buffer.from(itemsHex, 'hex');
    modelResources.resources = JSON.stringify(resourcesList);

    await Promise.all([
      warehouse.save(),
      modelResources.save(),
      saveLog({
        account: req.username,
        module: 'withdraw',
        message: `Total of {highlight:${insertCount}} resources were withdrawn.`,
        ip: req.ip,
        hidden: JSON.stringify({
          account: req.username,
          updatedResources: resourcesList,
          oldResources,
          request: withdraws
        })
      })
    ]);

    res.json({
      success:
        count !== insertCount
          ? `You only had space for ${insertCount} resources in your warehouse.`
          : `All ${insertCount} resources were withdrawn to your warehouse.`,
      items: itemsHex,
      resources: modelResources
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default deposit;
