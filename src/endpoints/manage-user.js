const templates = require('../templates');
const Database = require('better-sqlite3');
const db = require('../database');
const serveError = require('../serve-error');

function manageUser(req, res) {
	//with route protection, you will need to verify that the current user/session is role === 1

	var manageName = req.body.name;
	var manageEmail = req.body.email;
	var manageRoles = req.body.role;
	var id = req.body.id;

	if(manageEmail != "") {
		var manageEmailQuery = db.prepare("UPDATE users SET email = ? WHERE id = ?").run(manageEmail, );
	}



	// var manageQuery = 
}

module.exports = createUser;