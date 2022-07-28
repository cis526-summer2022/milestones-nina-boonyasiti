const db = require('../database');
const templates = require('../templates');
const createRequest = require('./create-request');

function showUser(req, res) {

	var users = db.prepare("SELECT * FROM users;").all();
	var user = users[0];
	var nameOfUser = user.name;
	var userID = user.user_id;

	var userHtml = templates['user-list.html'] ({users: users, nameOfUser: nameOfUser, user: req.session.user, userID: userID});

	res.setHeader("Content-Type", "text/html");
	res.setHeader("Content-Length", userHtml.length);
	res.send(userHtml);
}

module.exports = showUser;