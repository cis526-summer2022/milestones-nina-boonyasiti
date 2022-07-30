const templates = require('../templates');
const Database = require('better-sqlite3');
const db = require('../database');

module.exports = function(req, res) {
	var form = templates["upgradeuser.html"]({
		errorMessage: "",
    user: req.session.user
  });

  var html = templates["layout.html"]({
    title: "Upgrade a User",
    boxes: form,
    user: req.session.user
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}