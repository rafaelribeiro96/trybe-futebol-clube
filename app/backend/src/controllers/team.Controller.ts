import { Request, Response } from 'express';
import { getTeams, getTeamId } from '../services/team.Service';

export const getAllTeams = async (req: Request, res: Response) => {
  const teams = await getTeams();
  return res.status(200).json(teams);
};

export const getSingleTeam = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await getTeamId(Number(id));
  return res.status(200).json(team);
};
