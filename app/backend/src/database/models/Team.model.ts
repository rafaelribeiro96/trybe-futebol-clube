import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match.model';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  teamName: DataTypes.STRING,
}, { underscored: true, sequelize: db, modelName: 'teams', timestamps: false });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Team;
