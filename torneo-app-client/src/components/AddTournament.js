import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddTournament = () => {
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await api.get('/players');
      setPlayers(response.data);
    };
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tournaments', { name, players: selectedPlayers });
      setName('');
      setSelectedPlayers([]);
      alert('Tournament added successfully');
    } catch (error) {
      console.error('Error adding tournament:', error);
    }
  };

  const handlePlayerSelect = (e) => {
    const playerId = e.target.value;
    if (e.target.checked) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    } else {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Tournament</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tournament Name"
        required
      />
      <h3>Select Players</h3>
      {players.map((player) => (
        <div key={player._id}>
          <label>
            <input
              type="checkbox"
              value={player._id}
              onChange={handlePlayerSelect}
            />
            {player.name}
          </label>
        </div>
      ))}
      <button type="submit">Add Tournament</button>
    </form>
  );
};

export default AddTournament;
