const path = require('path');
const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const newBox = require('./endpoints/new-box.js');
const parseBody = require ('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const showBox = require('./endpoints/show-box.js');
const boxDirectory = require('./endpoints/box-directory.js');
const getCommunityChests = require('./endpoints/get-community-chests.js');
require('../server');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.get('/', serveHomepage);
app.use(express.static('static'));

app.get('/chests', getCommunityChests)

app.get('/boxes/new', newBox);
app.post('/boxes', parseBody, createRequest);
app.get('/boxes/:id', showBox);
app.post('/box-locations/:id/requests', createRequest);
app.get('/box-directory', boxDirectory);

/**
 * FOR SUBMITTING
 * Create a new POST endpoint /box-locations/:id/requests
 * Create a new file to hold the function for handling data
 * -- Before you do anything --
 * 		- Create a new table called requests
 * -- Function should: 
 * 		- retrieve post req info
 * 		- create new entry in chest-requests using the box id as primary key
 * -- Updating Page (/boxes/:id, show-box(.html and .js))
 * 		- Do db.prepare to get all chest-requests from chest-request
 * 		- in your template you must update html to include the list of chest-request ([])
 * 		- Update your show-box.html.ejs to display all the chest request on the page
 */


module.exports = app;

