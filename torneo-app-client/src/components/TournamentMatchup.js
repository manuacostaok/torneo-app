import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TournamentMatchups = ({ tournamentId }) => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    fetchMatchups();
  }, []);

  const fetchMatchups = async () => {
    try {
      const response = await api.get(`/tournaments/${tournamentId}/matchups`);
      setMatchups(response.data);
    } catch (error) {
      console.error('Error al obtener matriz de enfrentamientos:', error);
    }
  };

  return (
    <div>
      <h2>Matriz de Enfrentamientos</h2>
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Enfrentamientos</th>
          </tr>
        </thead>
        <tbody>
          {matchups.map((matchup, index) => (
            <tr key={index}>
              <td>{matchup.player}</td>
              <td>{matchup.opponent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentMatchups;
