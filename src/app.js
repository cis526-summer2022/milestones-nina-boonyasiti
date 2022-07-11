const path = require('path');
const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const newBox = require('./endpoints/new-box.js');
const parseBody = require ('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const showBox = require('./endpoints/show-box.js')
require('../server');

const app = express();
app.get('/', serveHomepage);
app.use(express.static('static'));

app.get('/boxes/new', newBox);
app.post('/boxes', parseBody, createRequest);
app.get('/boxes/:id', showBox);
app.get('/box-locations/:id/requests', createRequest);

module.exports = app;

