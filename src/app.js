const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const path = require('path');
require('../server');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', serveHomepage);

app.use('/static', express.static(path.join(__dirname, 'static')))



module.exports = app;

