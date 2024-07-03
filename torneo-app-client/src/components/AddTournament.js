import React, { useState,useEffect } from 'react';
import api from '../services/api'; // Asegúrate de que el path sea correcto según la estructura real

const AddTournament = () => {
  const [name, setName] = useState('');
  const [playerIds, setPlayerIds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tournaments', { name, playerIds });
      console.log('Torneo creado:', response.data);
      setName('');
      setPlayerIds([]);
      alert('Torneo creado exitosamente');
    } catch (error) {
      console.error('Error al crear torneo:', error);
      alert('Error al crear torneo');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Torneo</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del Torneo"
        required
      />
      <input
        type="text"
        value={playerIds.join(', ')}
        onChange={(e) => setPlayerIds(e.target.value.split(',').map(id => id.trim()))}
        placeholder="IDs de Jugadores separados por coma"
        required
      />
      <button type="submit">Crear Torneo</button>
    </form>
  );
};

export default AddTournament;
