import { Request, Response } from 'express';
import { getMatches, saveMatch, finishMatch, updateMatch } from '../services/match.Service';

export const getMatch = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const matches = await getMatches(inProgress as string | undefined);
  return res.status(200).json(matches);
};

export const createMatch = async (req: Request, res: Response) => {
  const credentials = req.body;
  const newMatch = await saveMatch(credentials);
  return res.status(201).json(newMatch);
};

export const endMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await finishMatch(Number(id));
  return res.status(200).json({ message: 'Finished' });
};

export const modifyMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  const match = req.body;
  await updateMatch(Number(id), match);
  return res.status(200).json({ message: 'Updated' });
};
