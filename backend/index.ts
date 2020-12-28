import config from './config';
import { state } from './state/gameState';

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express(),
      bodyParser = require("body-parser"),
      port = 8080;

import routes from './routes';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/api', routes);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server listening on port::${port}`);
});

export const io = require('socket.io')(server, {
  cors: {
    origins: ['https://107j.nl', 'http://localhost:8081', 'https://localhost:8081', 'http://107j.nl'],
    methods: ['GET', 'POST', 'PUT']
  }
});

io.on('connection', function(socket) {
  console.log(socket.id)
});

setInterval(function() {
  fs.writeFileSync(config.gameStateSavefile, JSON.stringify(state, null, 4) , 'utf-8');
  console.log('Saved game state.');
}, config.saveGamestateInterval);