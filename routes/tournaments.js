const express = require('express');
const router = express.Router();
const { Tournament, Player } = require('../models/Tournament'); // Asegúrate de importar correctamente los modelos

// Endpoint para crear un torneo
router.post('/', async (req, res) => {
  const { name, playerIds } = req.body;

  try {
    // Validar que se proporcionen al menos dos jugadores
    if (!name) {
      return res.status(400).json({ error: 'Nombre del torneo es requerido' });
    }

    if (!playerIds || playerIds.length < 2) {
      return res.status(400).json({ error: 'Debe haber al menos dos jugadores para crear un torneo' });
    }

    // Crear el torneo en la base de datos
    const tournament = await Tournament.create({ name });

    // Asociar los jugadores al torneo
    await tournament.addPlayers(playerIds);

    res.status(201).json(tournament); // Respondemos con el torneo creado
  } catch (error) {
    console.error('Error al crear torneo:', error);
    res.status(500).json({ error: 'Error interno al crear torneo' });
  }
});

// Endpoint para obtener todos los jugadores
router.get('/players', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.status(200).json(players); // Respondemos con todos los jugadores
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
    res.status(500).json({ error: 'Error interno al obtener jugadores' });
  }
});

module.exports = router;
