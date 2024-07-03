const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();

// Configurar middleware para JSON y rutas estáticas
app.use(express.json());
app.use(express.static(path.join(__dirname, '../torneo-app-client', 'build')));

// Rutas para API
app.use('/api/players', require('../routes/players'));
app.use('/api/tournaments', require('../routes/tournaments'));

// Configuración del servidor HTTP
const server = http.createServer(app);

// Configuración del servidor WebSocket
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Ejemplo de recibir mensajes desde el cliente WebSocket
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Ejemplo de enviar mensaje de vuelta al cliente WebSocket
    ws.send('Mensaje recibido por el servidor');
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Ruta para servir la aplicación React en producción
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../torneo-app-client', 'build', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
