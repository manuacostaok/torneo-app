const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const players = require('./routes/players');
const tournaments = require('./routes/tournaments');

app.use('/api/players', players);
app.use('/api/tournaments', tournaments);

// Middleware
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/torneo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Rutas
app.get('/', (req, res) => res.send('Hello World'));

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
