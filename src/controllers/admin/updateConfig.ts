// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';
import { json } from '../../tools/json';

// Models
import model from '../../db/models';

const updateConfig = async (req: Request, res: Response) => {
  try {
    if (!req.admin) {
      return res.status(403).json({ error: `You don't have access.` });
    }

    const { configName, updated } = req.body;

    const config = await model._nyxConfig.findOne({
      where: { name: configName }
    });

    if (!config) {
      return res.status(400).json({ error: `Couldn't find config` });
    }

    if (
      !json.parse(updated) &&
      !isNaN(Number(config.value)) &&
      !isNaN(updated)
    ) {
      return res.status(400).json({ error: `Corrupted data` });
    }

    config.value = updated;
    await config.save();

    res.json({
      success: `Configuration for ${configName} successfully updated.`
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default updateConfig;
