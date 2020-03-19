// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const changeClass = async (req: Request, res: Response) => {
  try {
    const { name, newClass } = req.body;

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
        .json({ error: 'This Character could not be found.' });
    }

    if (character.Class === newClass) {
      return res
        .status(400)
        .json({ error: `You are already this class, ${character.Name}.` });
    }

    const _config = await model._nyxConfig.findOne({
      where: { name: 'change_class' }
    });

    if (!_config) {
      return res
        .status(400)
        .json({ error: `Could'nt load change_class config.` });
    }

    const config = JSON.parse(_config.value);

    if (!config.enabled) {
      return res
        .status(400)
        .json({ error: `Change Class is currently disabled.` });
    }

    if (!config.classes.includes(newClass)) {
      return res.status(400).json({
        error: `This class is not in the list of allowed classes.`
      });
    }

    if (config.min_level > character.cLevel) {
      return res.status(400).json({
        error: `You have to be at least level ${config.min_level} to change your class.`
      });
    }

    if (config.min_resets > character.Resets) {
      return res.status(400).json({
        error: `You have to be at least ${config.min_resets} resets to change your class.`
      });
    }

    if (config.max_resets < character.Resets) {
      return res.status(400).json({
        error: `You cannot change your class after reaching ${config.max_resets} resets.`
      });
    }

    if (
      character.status.ConnectStat === 1 &&
      character.account.GameIDC === character.Name
    ) {
      return res
        .status(400)
        .json({ error: `You have to be Offline to change your class.` });
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

    const oldClass = character.Class;

    resources.credits -= config.cost;
    character.Class = newClass;

    await Promise.all([
      resources.save(),
      character.save(),
      saveLog({
        account: req.username,
        module: 'class',
        message: `{char:${character.Name}} changed class from {class:${oldClass}} to {class:${newClass}} for {highlight:${config.cost}} credits.`,
        hidden: `{"name":"${name}","oldClass":"${oldClass}","newClass":"${newClass}","cost":${config.cost}}`,
        ip: req.ip
      })
    ]);

    res.json({
      success: `Your Class was successfully changed, ${character.Name}!`
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default changeClass;
