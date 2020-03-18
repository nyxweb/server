// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const reset = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const character = await model.Character.findOne({
      where: {
        AccountID: req.username,
        Name: name
      }
    });

    if (!character) {
      return res
        .status(404)
        .json({ error: `Such character could not be found.` });
    }

    let config: any = await model._nyxConfig.findOne({
      where: {
        name: 'reset'
      }
    });

    if (!config) {
      return res.status(404).json({ error: `Couldn't find reset config.` });
    }

    config = JSON.parse(config.value);

    if (character.Resets >= config.max_reset) {
      return res.json({
        error: `You are already max resets, ${character.Name}`
      });
    }

    if (character.cLevel < config.reset_level) {
      return res.json({
        error: `You need level ${config.reset_level} to reset, ${character.Name}`
      });
    }

    const resetCost = config.reset_zen_formula
      ? character.Resets * config.reset_zen + config.reset_zen
      : config.reset_zen;
    if (character.Money < resetCost) {
      return res.json({
        error: `You need ${resetCost.toLocaleString()} zen to reset, ${
          character.Name
        }`
      });
    }

    character.Money -= resetCost;
    character.cLevel = 1;
    character.Resets += 1;
    character.Experience = 0;

    if (config.reset_stats) {
      character.Strength = 100;
      character.Dexterity = 100;
      character.Vitality = 100;
      character.Energy = 100;

      if (character.Class === 64 || character.Class === 65) {
        character.Leadership = 100;
      }

      const classId = [0, 1, 2].includes(character.Class)
        ? 0
        : [16, 17, 18].includes(character.Class)
        ? 1
        : [32, 33, 34].includes(character.Class)
        ? 2
        : [48, 49].includes(character.Class)
        ? 3
        : 4;

      character.LevelUpPoint =
        config.bonus_stats[classId] * (character.Resets + 1);
    }

    await Promise.all([
      character.save(),
      saveLog({
        account: req.username,
        module: 'reset',
        message: `{char:${character.Name}} completed reset number {highlight:${
          character.Resets
        }} for {highlight:${resetCost.toLocaleString()}} zen.`,
        hidden: `{"name":"${character.Name}","reset":"${character.Resets}","cost":${resetCost}}`,
        ip: req.ip
      })
    ]);

    res.json({
      success: `Reset number ${character.Resets} completed successfully.`
    });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default reset;
