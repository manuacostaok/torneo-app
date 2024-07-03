import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TournamentTable = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const response = await api.get('/tournaments');
      setTournaments(response.data);
    };
    fetchTournaments();
  }, []);

  return (
    <div>
      <h2>Tournaments</h2>
      {tournaments.map((tournament) => (
        <div key={tournament._id}>
          <h3>{tournament.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Victories</th>
              </tr>
            </thead>
            <tbody>
              {tournament.players.map((player) => (
                <tr key={player._id}>
                  <td>{player.name}</td>
                  <td>{player.victories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TournamentTable;
