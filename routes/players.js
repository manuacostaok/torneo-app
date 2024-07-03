const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
 // Ajustar el path según la estructura de tu proyecto

// Endpoint para agregar un jugador
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    // Validaciones básicas
    if (!name) {
      return res.status(400).json({ error: 'Nombre del jugador es requerido' });
    }

    // Crear el jugador en la base de datos
    const player = await Player.create({ name });

    res.status(201).json(player); // Respondemos con el jugador creado
  } catch (error) {
    console.error('Error al agregar jugador:', error);
    res.status(500).json({ error: 'Error interno al agregar jugador' });
  }
});

module.exports = router;
