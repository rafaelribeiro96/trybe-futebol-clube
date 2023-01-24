import MatchModel from '../database/models/Match.model';
import Team from '../database/models/Team.model';

export const getMatches = async (inProgress?: string) => {
  const matches = await MatchModel.findAll({
    include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ],
  });
  if (inProgress === undefined) { return matches; }
  return matches.filter((match) => match.inProgress.toString() === inProgress);
};

export const getMatch = async (id: number) => {
  const match = await MatchModel.findByPk(id);
  return match;
};
