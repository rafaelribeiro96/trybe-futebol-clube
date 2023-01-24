import Match from '../database/models/Match.model';

const totalPoints = (acc: number, curr: Match, goalsFavor: number, goalsOwn: number): number => {
  if (goalsFavor > goalsOwn) return acc + 3;
  if (goalsFavor === goalsOwn) return acc + 1;
  return acc;
};

const winner = (acc: number, curr: Match, goalsFavor: number, goalsOwn: number): number => {
  if (goalsFavor > goalsOwn) return acc + 1;
  return acc;
};
const losses = (acc: number, curr: Match, goalsFavor: number, goalsOwn: number): number => {
  if (goalsFavor < goalsOwn) return acc + 1;
  return acc;
};

export const draws = (acc: number, curr: Match): number => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
  return acc;
};

export const totalHomePoints = (acc: number, curr: Match): number =>
  totalPoints(acc, curr, curr.homeTeamGoals, curr.awayTeamGoals);
export const homeWinner = (acc: number, curr: Match): number =>
  winner(acc, curr, curr.homeTeamGoals, curr.awayTeamGoals);
export const homeLosses = (acc: number, curr: Match): number =>
  losses(acc, curr, curr.homeTeamGoals, curr.awayTeamGoals);
export const homeGoalsFavor = (acc: number, curr: Match): number => acc + curr.homeTeamGoals;
export const homeGoalsOwn = (acc: number, curr: Match): number => acc + curr.awayTeamGoals;

export const totalAwayPoints = (acc: number, curr: Match): number =>
  totalPoints(acc, curr, curr.awayTeamGoals, curr.homeTeamGoals);
export const awayWinner = (acc: number, curr: Match): number =>
  winner(acc, curr, curr.awayTeamGoals, curr.homeTeamGoals);
export const awayLosses = (acc: number, curr: Match): number =>
  losses(acc, curr, curr.awayTeamGoals, curr.homeTeamGoals);
export const awayGoalsFavor = (acc: number, curr: Match): number => acc + curr.awayTeamGoals;
export const awayGoalsOwn = (acc: number, curr: Match): number => acc + curr.homeTeamGoals;
