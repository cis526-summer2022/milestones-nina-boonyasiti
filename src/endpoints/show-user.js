const db = require('../database');
const templates = require('../templates');
const createRequest = require('./create-request');

function showUser(req, res) {
	var boxes = db.prepare('SELECT * FROM boxes;').all();
  var box = boxes[0];
	var users = db.prepare("SELECT * FROM users;").all();
	var user = users[0];
	var nameOfUser = user.name;
	var userID = user.id;

	var userHtml = templates['user-list.html'] ({users: users, user: req.session.user});

	var html = templates["layout.html"]({
    title: "List of users",
		users: userHtml,
		nameOfUser: nameOfUser,
		user: req.session.user,
		userID: userID,
    boxes: userHtml
  });

	res.setHeader("Content-Type", "text/html");
	res.setHeader("Content-Length", html.length);
	res.send(html);
}


module.exports = showUser;