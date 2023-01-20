import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match.model';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});

Team.hasMany(Match, { foreignKey: 'id', as: 'matchId' });

export default Team;
