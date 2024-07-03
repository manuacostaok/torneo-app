const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Crear jugador
router.post('/', async (req, res) => {
  const newPlayer = new Player(req.body);
  try {
    const player = await newPlayer.save();
    res.json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los jugadores
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
