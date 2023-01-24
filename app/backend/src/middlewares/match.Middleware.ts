import { NextFunction, Request, Response } from 'express';
import TeamModel from '../database/models/Team.model';

export default async (req: Request, res: Response, next: NextFunction) => {
  const match = req.body;

  if (match.homeTeamId === match.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeTeam = await TeamModel.findByPk(match.homeTeamId);
  const awayTeam = await TeamModel.findByPk(match.awayTeamId);

  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};
