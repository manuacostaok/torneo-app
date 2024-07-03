const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Tournament = sequelize.define('Tournament', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Matchup = sequelize.define('Matchup', {
  player1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  player2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});

Tournament.belongsToMany(Player, { through: 'TournamentPlayers' });
Player.belongsToMany(Tournament, { through: 'TournamentPlayers' });

Tournament.hasMany(Matchup);
Matchup.belongsTo(Tournament);

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database', err));

module.exports = { sequelize, Player, Tournament, Matchup };
