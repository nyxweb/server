import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  res.status(404).end('NyxWeb create by Dea7h for www.DarksTeam.net');
};

export default notFound;
