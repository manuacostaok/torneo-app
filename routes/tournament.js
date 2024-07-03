const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const Player = require('../models/Player');

// Crear torneo
router.post('/', async (req, res) => {
  const newTournament = new Tournament(req.body);
  try {
    const tournament = await newTournament.save();
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los torneos
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate('players');
    res.json(tournaments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
