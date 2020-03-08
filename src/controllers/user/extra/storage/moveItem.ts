// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../../tools/logger';
import { isSlotEmpty, hexDecode } from '../../../../tools/user/storage';

// Models
import model from '../../../../db/models';

// Config
import config from '../../../../configs';

const moveItem = async (req: Request, res: Response) => {
  try {
    const { itemSlot, newSlot, from, to } = req.body;

    let warehouse = await model.warehouse.findOne({
      where: { AccountID: req.username }
    });

    let storage = await model._nyxResources.findOne({
      where: { account: req.username }
    });

    if (!warehouse) {
      warehouse = new model.warehouse();
      warehouse.AccountID = req.username;
      warehouse.Items = Buffer.from('f'.repeat(3840), 'hex');
      warehouse.pw = 0;
      warehouse.EndUseDate = new Date();
      await warehouse.save();
    }

    if (!storage) {
      storage = new model._nyxResources();
      storage.account = req.username;
      storage.resources = JSON.stringify(
        config.user.resources.map((name: string) => ({
          name,
          value: 0
        }))
      );
      await storage.save();
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

    if (to === 'storage' && storageItems.length / 32 >= 240) {
      return res.status(400).json({ error: 'Your Storage is full' });
    }

    if (
      to === 'warehouse' &&
      !isSlotEmpty(
        newSlot,
        item,
        warehouseItems,
        to === from ? itemSlot : false
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

    await warehouse.save();
    await storage.save();

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
