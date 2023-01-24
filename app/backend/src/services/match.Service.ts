import Team from '../database/models/Team.model';
import MatchModel from '../database/models/Match.model';
import { IMatchCredentials } from '../interfaces/Imatch';

export const getMatches = async (inProgress: string | undefined) => {
  const matches = await MatchModel.findAll({ include: [
    { model: Team, as: 'homeTeam', attributes: ['teamName'] },
    { model: Team, as: 'awayTeam', attributes: ['teamName'] }] });
  const filterMatches = matches.filter((match) => inProgress === undefined
    || match.inProgress.toString() === inProgress);
  return filterMatches;
};

export const saveMatch = async (match: IMatchCredentials) => {
  const newMatch = await MatchModel.create({ ...match, inProgress: true });
  return newMatch;
};

export const finishMatch = async (id: number) => {
  await MatchModel.update({ inProgress: false }, { where: { id } });
};

export const updateMatch = async (id: number, match: IMatchCredentials) => {
  await MatchModel.update({ ...match }, { where: { id } });
};
