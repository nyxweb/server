// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const changeName = async (req: Request, res: Response) => {
  try {
    const { name, newName } = req.body;

    const checkName = await model.Character.findOne({
      where: { Name: newName }
    });

    if (checkName) {
      return res.status(400).json({ error: 'This Name is already in use.' });
    }

    const _config = await model._nyxConfig.findOne({
      where: { name: 'change_name' }
    });

    if (!_config) {
      return res
        .status(400)
        .json({ error: `Could'nt load change_name config.` });
    }

    const config = JSON.parse(_config.value);

    if (!config.enabled) {
      return res
        .status(400)
        .json({ error: `Change Name is currently disabled.` });
    }

    if (
      newName.length < config.min_length ||
      newName.length > config.max_length
    ) {
      return res.status(400).json({
        error: `Your new name cannot be less than ${config.min_length} or more than ${config.max_length} characters`
      });
    }

    const character = await model.Character.findOne({
      where: { AccountID: req.username, Name: name },
      include: [
        {
          model: model.MEMB_STAT
        },
        {
          model: model.AccountCharacter
        }
      ]
    });

    if (!character) {
      return res
        .status(400)
        .json({ error: `This Character could not be found.` });
    }

    if (
      character.status.ConnectStat === 1 &&
      character.account.GameIDC === character.Name
    ) {
      return res
        .status(400)
        .json({ error: `You have to be Offline to change your name.` });
    }

    const resources = await model._nyxResources.findOne({
      where: { account: req.username }
    });

    if (!resources) {
      return res.status(400).json({ error: `Could'nt find user resources.` });
    }

    if (resources.credits < config.cost) {
      return res.status(400).json({
        error: `You need ${config.cost} credits to change your name.`
      });
    }

    resources.credits -= config.cost;
    character.Name = newName;

    await Promise.all([
      resources.save(),
      character.save(),
      saveLog({
        account: req.username,
        module: 'name',
        message: `Name changed from {highlight:${name}} to {highlight:${newName}} for {highlight:${config.cost}} credits.`,
        hidden: `{"name":"${name}","newName":"${newName}","cost":${config.cost}}`,
        ip: req.ip
      })
    ]);

    res.json({ success: `Your Name was successfully changed to ${newName}` });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default changeName;
