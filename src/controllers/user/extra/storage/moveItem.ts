// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../../tools/logger';

// Models
import model from '../../../../db/models';

const moveItem = async (req: Request, res: Response) => {
  try {
    const { itemSlot, newSlot } = req.body;

    const warehouse = await model.warehouse.findOne({
      where: { AccountID: req.username }
    });

    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse doesnt exist' });
    }

    const items = warehouse.Items.toString('hex');

    // Moving the item
    const oldItem = items.substr(itemSlot * 32, 32);

    const remove =
      items.slice(0, itemSlot * 32) +
      'f'.repeat(32) +
      items.slice((itemSlot + 1) * 32);

    const add =
      remove.slice(0, newSlot * 32) +
      oldItem +
      remove.slice((newSlot + 1) * 32);

    warehouse.Items = Buffer.from(add, 'hex');

    console.log(warehouse.Items.length);

    await warehouse.save();

    res.json({ success: 'Item moved successfully' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default moveItem;
