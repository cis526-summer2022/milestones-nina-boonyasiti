const templates = require('../templates');
const Database = require('better-sqlite3');
const db = require('../database');
const serveError = require('../serve-error');

function manageUser(req, res) {
	//with route protection, you will need to verify that the current user/session is role === 1

	var manageName = req.body.name;
	var manageEmail = req.body.email;
	var manageRoles = req.body.role;
	var id = req.body.user_id;

	var userQuery = db.prepare("SELECT * FROM users WHERE user_id = ?").get(id);
	console.log("THIS IS THE USER: ", userQuery);		

	if(userQuery) {
		if(manageName != "") {
			var modifyNameQuery = db.prepare("UPDATE users SET name = ? WHERE user_id = ?").run (manageName, id);
		}
		if(manageEmail != "") {
			var modifyEmailQuery = db.prepare("UPDATE users SET email = ? WHERE user_id = ?").run (manageEmail, id);
		}
		if(manageRoles != "") {
			var modifyRolesQuery = db.prepare("UPDATE users SET roles = ? WHERE user_id = ?").run (manageRoles, id);
		}
		var updatedUserQuery = db.prepare("SELECT * FROM users WHERE user_id = ?").get(id);
		console.log("THIS IS THE UPDATED USER: ", updatedUserQuery);
	}

	res.setHeader("Location", "/users");
	res.statusCode = 302;
	res.end();
}

module.exports = manageUser;