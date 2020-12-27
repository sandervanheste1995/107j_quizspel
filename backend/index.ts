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

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});