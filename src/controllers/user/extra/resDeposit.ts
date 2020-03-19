// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';

// Models
import model from '../../../db/models';
import { json } from '../../../tools/json';

interface Resource {
  group: number;
  id: number;
  level: number;
  value: number;
}

const deposit = async (req: Request, res: Response) => {
  try {
    const deposits: Resource[] = req.body.deposits;

    const _config = await model._nyxConfig.findOne({
      where: { name: 'resources' }
    });
    const config: Resource[] = json.parse(_config.value);

    if (!_config || !config) {
      return res.status(400).json({ error: 'Config resources not found.' });
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

    if (config.length !== deposits.length || !status) {
      return res.status(400).json({ error: 'Invalid data provided.' });
    }

    if (!count) {
      return res
        .status(400)
        .json({ error: 'Please select something to deposit.' });
    }

    // TODO!: countAndRemove items from warehouse function

    res.json({ success: 'here' });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default deposit;
