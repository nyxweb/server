import { Op } from 'sequelize';

// Types
import { Request, Response } from 'express';

// Tools
import logger from '../../tools/logger';

// Models
import model from '../../db/models';

const getHof = async (req: Request, res: Response) => {
  try {
    const sm = await model.Character.findOne({
      where: { [Op.or]: [{ Class: 0 }, { Class: 1 }] },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: model.MEMB_STAT,
          attributes: {
            exclude: ['memb___id']
          }
        },
        {
          model: model.AccountCharacter,
          attributes: {
            exclude: ['Id']
          }
        }
      ]
    });

    const bk = await model.Character.findOne({
      where: { [Op.or]: [{ Class: 16 }, { Class: 17 }] },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: model.MEMB_STAT,
          attributes: {
            exclude: ['memb___id']
          }
        },
        {
          model: model.AccountCharacter,
          attributes: {
            exclude: ['Id']
          }
        }
      ]
    });

    const elf = await model.Character.findOne({
      where: { [Op.or]: [{ Class: 32 }, { Class: 33 }] },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: model.MEMB_STAT,
          attributes: {
            exclude: ['memb___id']
          }
        },
        {
          model: model.AccountCharacter,
          attributes: {
            exclude: ['Id']
          }
        }
      ]
    });

    const mg = await model.Character.findOne({
      where: {
        Class: 48
      },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: model.MEMB_STAT,
          attributes: {
            exclude: ['memb___id']
          }
        },
        {
          model: model.AccountCharacter,
          attributes: {
            exclude: ['Id']
          }
        }
      ]
    });

    const dl = await model.Character.findOne({
      where: {
        Class: 64
      },
      attributes: ['Name', 'Class', 'HOFWins'],
      order: [
        ['HOFWins', 'DESC'],
        ['Resets', 'DESC'],
        ['cLevel', 'DESC']
      ],
      include: [
        {
          model: model.MEMB_STAT,
          attributes: {
            exclude: ['memb___id']
          }
        },
        {
          model: model.AccountCharacter,
          attributes: {
            exclude: ['Id']
          }
        }
      ]
    });

    res.json(!sm && !bk && !elf && !mg && !dl ? false : [sm, bk, elf, mg, dl]);
  } catch (error) {
    logger.error({ error, res });
  }
};

export default getHof;
