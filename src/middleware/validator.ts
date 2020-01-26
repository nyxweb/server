import { validationResult } from 'express-validator';

// Types
import { Request, Response, NextFunction } from 'express';

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }

  next();
};

export default validator;
