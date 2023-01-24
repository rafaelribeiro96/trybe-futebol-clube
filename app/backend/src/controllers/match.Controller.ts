import { Request, Response } from 'express';
import { getMatches } from '../services/match.Service';

export const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matches = await getMatches(inProgress as string | undefined);
  return res.status(200).json(matches);
};

export const createMatch = async (req: Request, res: Response) => {
  const matches = {};
  return res.status(200).json(matches);
};
