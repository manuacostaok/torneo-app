const { Matchup, Tournament, Player } = require('./db');

async function generateMatchups(tournamentId) {
  try {
    const tournament = await Tournament.findByPk(tournamentId, { include: Player });

    if (!tournament) {
      throw new Error('Torneo no encontrado');
    }

    const players = tournament.Players;

    // Lógica para generar combinaciones de enfrentamientos (Matchups)
    // Aquí deberías implementar tu lógica específica
    const matchups = [];

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const matchup = await Matchup.create({
          player1: players[i].name,
          player2: players[j].name,
          result: null
        });
        matchups.push(matchup);
      }
    }

    return matchups;
  } catch (error) {
    console.error('Error generando enfrentamientos:', error);
    throw error;
  }
}

module.exports = { generateMatchups };
