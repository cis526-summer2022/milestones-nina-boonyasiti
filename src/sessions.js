const {v1: uuidv1} = require('uuid');
const db = require('./database');
const SESSION_MAX_DURATION = 3 * 60 * 1000; 
const SESSION_EXPIRATION_INTERVAL = 60 * 60 * 1000;

var sessions = {};

function generateUUID() {
	var uuid = uuidv1();
	while(sessions[uuid]) {uuid = uuidv1()}
	return uuid;
}

function createSession(user) {
	var roles = 1;
  var sid = generateUUID();  
  var role = db.prepare("SELECT roles FROM users WHERE roles=?").get(roles);
  console.log("USER ROLE: ", user.roles);
  sessions[sid] = {
    timestamp: Date.now(),
    user: {
      email: user.email,
      name: user.name,
      roles: user.roles
    },
    data: {}
  }
  return sid;
}

function getSession(sid) {
  if(sessions[sid]) {
    return JSON.parse(JSON.stringify(sessions[sid]));
  } else {
    return false;
  }
}

module.exports = {
  create: createSession,
  get: getSession
}