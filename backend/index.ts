import { state } from './state/gameState';
const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser"),
      port = 8080;

import routes from './routes';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/api', routes);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origins: ['http://107j.nl', 'http://localhost:8081'],
    methods: ['GET', 'POST', 'PUT']
  }
});

io.on('connection', function(socket) {
  console.log(socket.id)
  socket.on('SET_GAMESTATE', function(data) {
    state.clientState = data;
    io.emit('GAMESTATE', data);
  });
});