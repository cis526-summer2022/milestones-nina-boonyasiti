const path = require('path');
const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const parseBody = require ('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const showBox = require('./endpoints/show-box.js');

require('../server');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get('/', serveHomepage);

app.get('/boxes/:id', showBox);
app.post('/box-locations/:id/requests', createRequest);


module.exports = app;

