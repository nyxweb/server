// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../../tools/logger';
import { storage as itemsStorage } from '../../../../tools/items';
import { saveLog } from '../../../../tools/user/logs';

// Models
import model from '../../../../db/models';

const moveItem = async (req: Request, res: Response) => {
  try {
    const { itemSlot, newSlot, from, to } = req.body;

    const config = await model._nyxConfig.findOne({
      where: { name: 'itemsList' }
    });

    if (!config) {
      return res.status(400).json({
        error: 'ItemsList config was not found.'
      });
    }

    let warehouse = await model.warehouse.findOne({
      where: { AccountID: req.username }
    });

    const storage = await model._nyxResources.findOne({
      where: { account: req.username }
    });

    if (!warehouse) {
      warehouse = new model.warehouse();
      warehouse.AccountID = req.username;
      warehouse.Items = Buffer.from('f'.repeat(3840), 'hex');
      warehouse.pw = 0;
      await warehouse.save();
    }

    const warehouseItems = warehouse.Items.toString('hex');
    const storageItems = storage.items;

    // Moving the item
    const item = (from === 'warehouse' ? warehouseItems : storageItems).substr(
      itemSlot * 32,
      32
    );

    if (
      (warehouseItems.length / 32) % 1 !== 0 ||
      (storageItems.length / 32) % 1 !== 0 ||
      item.length !== 32 ||
      item.toLowerCase() === 'f'.repeat(32)
    ) {
      return res.status(400).json({
        error: 'This item seems to be already moved.'
      });
    }

    if (to === 'storage' && storageItems.length / 32 >= 165) {
      return res.status(400).json({ error: 'Your Storage is full' });
    }

    if (
      to === 'warehouse' &&
      !itemsStorage.isSlotEmpty(
        newSlot,
        item,
        warehouseItems,
        to === from ? itemSlot : false,
        JSON.parse(config.value)
      )
    ) {
      return res
        .status(400)
        .json({ error: 'This warehouse slot is not empty' });
    }

    let updatedWarehouse = warehouseItems;
    let updatedStorage = storageItems;

    if (from === 'warehouse') {
      updatedWarehouse = warehouseItems.replace(item, 'f'.repeat(32));

      if (to === 'storage') {
        updatedStorage = storageItems + item;
      } else {
        updatedWarehouse =
          updatedWarehouse.slice(0, newSlot * 32) +
          item +
          updatedWarehouse.slice((newSlot + 1) * 32);
      }
    } else {
      if (to === 'warehouse') {
        updatedWarehouse =
          warehouseItems.slice(0, newSlot * 32) +
          item +
          warehouseItems.slice((newSlot + 1) * 32);

        updatedStorage = storageItems.replace(item, '');
      } else {
        return res.status(400).json({ error: 'Server error' });
      }
    }

    warehouse.Items = Buffer.from(updatedWarehouse, 'hex');
    storage.items = updatedStorage;

    await Promise.all([warehouse.save(), storage.save()]);

    if (from !== to) {
      await saveLog({
        account: req.username,
        module: 'storage',
        message: `Item {item:${item}} was moved from {highlight:${from}} to {highlight:${to}}.`,
        ip: req.ip,
        hidden: `{"item":"${item}","from":"${from}","to":"${to}","fromSlot":${itemSlot},"toSlot":${newSlot}}`
      });
    }

    res.json({
      success: 'Item moved successfully',
      warehouse: updatedWarehouse,
      storage: updatedStorage
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default moveItem;
