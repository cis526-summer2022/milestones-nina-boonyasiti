const path = require('path');
const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const parseBody = require ('./middleware/parse-body.js');
const createRequest = require('./endpoints/create-request.js');
const showBox = require('./endpoints/show-box.js');
const newUser = require('./endpoints/new-user.js');
const createUser = require('./endpoints/create-user');
const loadBody = require('./middleware/load-body');
const basicAuth = require('./middleware/basic-auth');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const loadSession = require('./middleware/load-session');
const authorsOnly = require('./middleware/authors-only');
const destroySession = require('./endpoints/destroy-session');
const fulfilledItem = require('./endpoints/fulfilled-item');
const upgradeUser = require('./endpoints/upgrade-user');
const upgradeUserPost = require('./endpoints/upgrade-user-post');
const createBoxLocation = require('./endpoints/create-box-location');
const submitBoxLocation = require('./endpoints/submit-box-location');
const showUser = require('./endpoints/show-user');

require('../server');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loadSession);
app.get('/', serveHomepage);
app.get('/boxes/:id', authorsOnly, showBox);
app.post('/box-locations/:id/requests', authorsOnly, createRequest);
app.post('/box-locations/:box_id/requests/:request_id/fulfill', authorsOnly, fulfilledItem);

app.get("/signup", newUser);
app.post("/signup", createUser);
app.get('/signin', newSession);
app.post("/signin", createSession);
app.get("/signout", destroySession);

//need route protections -- only admins, role === 1 may access these
app.get("/upgradeuser", upgradeUser);
app.post("/upgradeuser", upgradeUserPost);
app.get("/box-locations/new", createBoxLocation);
app.post("/box-locations/new", submitBoxLocation);
app.get('/users', showUser);




app.use(express.static('static'));

module.exports = app;

