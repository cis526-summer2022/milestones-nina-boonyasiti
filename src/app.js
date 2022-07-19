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
// const parseCookie = require('./middleware/parse-cookie');
// const loadCookieSession = require('./middleware/load-cookie-session');
const loadSession = require('./middleware/load-session');
const authorsOnly = require('./middleware/authors-only');


require('../server');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(parseCookie);
// app.use(loadCookieSession);
app.use(loadSession);
app.get('/', serveHomepage);
app.get('/boxes/:id', showBox);
app.post('/box-locations/:id/requests', authorsOnly, createRequest);
app.get("/signup", newUser);
app.post("/signup", createUser);
app.get('/signin', newSession);
app.post("/signin", createSession);

app.use(express.static('static'));

module.exports = app;

