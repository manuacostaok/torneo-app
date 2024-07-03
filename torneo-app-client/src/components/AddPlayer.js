// AddPlayer.js
import React, { useState } from 'react';
import axios from 'axios';

const AddPlayer = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/players', { name });
      console.log('Player added successfully:', response.data);
      setName('');
      alert('Player added successfully');
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Player</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player Name"
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayer;
