// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../../tools/logger';
import { saveLog } from '../../../tools/user/logs';

// Models
import model from '../../../db/models';

const saveStats = async (req: Request, res: Response) => {
  try {
    const {
      Strength,
      Dexterity,
      Vitality,
      Energy,
      Leadership,
      Name
    } = req.body;

    const character = await model.Character.findOne({
      where: { AccountID: req.username, Name },
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
        .json({ error: `This character could not be found.` });
    }

    if (
      character.account.GameIDC === character.Name &&
      character.status.ConnectStat === 1
    ) {
      return res.status(400).json({ error: `This character is Online` });
    }

    const config = await model._nyxConfig.findOne({
      where: { name: 'stats' }
    });

    if (!config) {
      return res.status(404).json({ error: `Couldn't find stats config.` });
    }

    const maxStats = Number(config.value);
    const statsSum = Strength + Dexterity + Vitality + Energy + Leadership;
    const isDL = [64, 65].includes(character.Class);

    if (statsSum <= 0) {
      return res.status(400).json({ error: `Please add your stats` });
    }

    if (statsSum > character.LevelUpPoint) {
      return res.status(400).json({ error: `You don't have enough stats` });
    }

    if (character.Strength + Strength > maxStats) {
      return res
        .status(400)
        .json({ error: `You cannot add more than ${maxStats} Strength` });
    }

    if (character.Dexterity + Dexterity > maxStats) {
      return res
        .status(400)
        .json({ error: `You cannot add more than ${maxStats} Agility` });
    }

    if (character.Vitality + Vitality > maxStats) {
      return res
        .status(400)
        .json({ error: `You cannot add more than ${maxStats} Vitality` });
    }

    if (character.Energy + Energy > maxStats) {
      return res
        .status(400)
        .json({ error: `You cannot add more than ${maxStats} Energy` });
    }

    if (
      (isDL && character.Leadership + Leadership > maxStats) ||
      (!isDL && Leadership > 0)
    ) {
      return res
        .status(400)
        .json({ error: `You cannot add more than ${maxStats} Command` });
    }

    await model.Character.update(
      {
        LevelUpPoint: character.LevelUpPoint - statsSum,
        Strength: character.Strength + Strength,
        Dexterity: character.Dexterity + Dexterity,
        Vitality: character.Vitality + Vitality,
        Energy: character.Energy + Energy,
        Leadership: character.Leadership + Leadership
      },
      { where: { Name } }
    );

    let statsString = '';
    statsString += Strength ? ` Strength {highlight:${Strength}} ` : '';
    statsString += Dexterity ? ` Agility {highlight:${Dexterity}} ` : '';
    statsString += Vitality ? ` Vitality {highlight:${Vitality}} ` : '';
    statsString += Energy ? ` Energy {highlight:${Energy}} ` : '';
    statsString += Leadership ? ` Command {highlight:${Leadership}} ` : '';

    saveLog({
      account: req.username,
      module: 'stats',
      message: `Stats added on {char:${
        character.Name
      }} ( ${statsString.trim()} ).`,
      ip: req.ip
    });

    res.json({ success: `Your stats was saved, ${character.Name}` });
  } catch (error) {
    logger.error({ error, res });
  }
};

export default saveStats;
