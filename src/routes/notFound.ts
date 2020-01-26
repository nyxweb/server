import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  res.json({ error: 'Not found' });
};

export default notFound;
