interface IMatchCredentials {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

interface IMatch {
  id: number,
  inProgress: boolean,
}

export { IMatch, IMatchCredentials };
