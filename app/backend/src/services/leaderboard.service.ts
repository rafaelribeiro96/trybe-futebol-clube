import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import {
  draws,
  totalHomePoints,
  homeWinner,
  homeLosses,
  homeGoalsFavor,
  homeGoalsOwn,
  totalAwayPoints,
  awayWinner,
  awayLosses,
  awayGoalsFavor,
  awayGoalsOwn } from '../helpers/helpers';
import { ILeaderboard, ILeaderI } from '../interfaces/leaderboard.interface';

export default class LeaderboardService {
  static async getHomeMatches(id: number): Promise<Match[]> {
    const matches = await Match.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  static async getHomeInfo(): Promise<Match[][]> {
    const teams = await Team.findAll();
    const matches = await Promise.all(teams.map((team) =>
      LeaderboardService.getHomeMatches(team.id)));
    return matches;
  }

  static async getAllHome(): Promise<ILeaderboard[]> {
    const teams = await Team.findAll();
    const homeMatches = await Promise.all(teams
      .map((team) => LeaderboardService.getHomeMatches(team.id)));
    return teams.map((team, index) => {
      const matches = homeMatches[index];
      return {
        name: team.teamName,
        totalPoints: matches.reduce(totalHomePoints, 0),
        totalGames: matches.length,
        totalVictories: matches.reduce(homeWinner, 0),
        totalDraws: matches.reduce(draws, 0),
        totalLosses: matches.reduce(homeLosses, 0),
        goalsFavor: matches.reduce(homeGoalsFavor, 0),
        goalsOwn: matches.reduce(homeGoalsOwn, 0),
        goalsBalance: matches.reduce(homeGoalsFavor, 0) - matches.reduce(homeGoalsOwn, 0),
        efficiency: ((matches.reduce(totalHomePoints, 0) / (matches.length * 3)) * 100).toFixed(2),
      };
    });
  }

  static async getAwayMatches(id: number): Promise<Match[]> {
    const matches = await Match.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }] });
    return matches;
  }

  static async getAwayInfo(): Promise<Match[][]> {
    const teams = await Team.findAll();
    const promises = teams.map((team) => LeaderboardService.getAwayMatches(team.id));
    const matches = await Promise.all(promises);
    return matches;
  }

  static async getAllAway(): Promise<ILeaderboard[]> {
    const teams = await Team.findAll();
    const data = await LeaderboardService.getAwayInfo();
    return teams.map((team, index) => {
      const teamData = data[index];
      return {
        name: team.teamName,
        totalPoints: teamData.reduce(totalAwayPoints, 0),
        totalGames: teamData.length,
        totalVictories: teamData.reduce(awayWinner, 0),
        totalDraws: teamData.reduce(draws, 0),
        totalLosses: teamData.reduce(awayLosses, 0),
        goalsFavor: teamData.reduce(awayGoalsFavor, 0),
        goalsOwn: teamData.reduce(awayGoalsOwn, 0),
        goalsBalance: teamData.reduce(awayGoalsFavor, 0) - teamData.reduce(awayGoalsOwn, 0),
        efficiency: ((teamData.reduce(totalAwayPoints, 0)
        / (teamData.length * 3)) * 100).toFixed(2),
      };
    });
  }

  static async sumAll(): Promise<ILeaderI[]> {
    const home = await LeaderboardService.getAllHome();
    const away = await LeaderboardService.getAllAway();
    return home.map((team, index) => {
      const awayTeam = away[index];
      return {
        name: team.name,
        totalPoints: team.totalPoints + awayTeam.totalPoints,
        totalGames: team.totalGames + awayTeam.totalGames,
        totalVictories: team.totalVictories + awayTeam.totalVictories,
        totalDraws: team.totalDraws + awayTeam.totalDraws,
        totalLosses: team.totalLosses + awayTeam.totalLosses,
        goalsFavor: team.goalsFavor + awayTeam.goalsFavor,
        goalsOwn: team.goalsOwn + awayTeam.goalsOwn,
      };
    });
  }

  static async getAll(): Promise<ILeaderboard[]> {
    const data = await LeaderboardService.sumAll();
    return data.map((team) => {
      const { goalsFavor, goalsOwn } = team;
      const goalsBalance = goalsFavor - goalsOwn;
      const efficiency = ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, goalsBalance, efficiency };
    });
  }
}
