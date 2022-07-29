const templates = require('../templates');
const db = require('../database');

function upgradeUserPost(req, res) {
	var userName = req.body.upgradeUserName;
	var userEmail = req.body.upgradeUserEmail;

	//check for existing user to upgrade
	var existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(userEmail);
	if(!existingUser) return failure(req, res, `"${userName}" does not exist.`);
	if(existingUser) {
		var upgradedUser = db.prepare("UPDATE users SET roles = 1 WHERE email = ?").run(userEmail);
		success(req, res);
		console.log("USER HAS BEEN UPGRADED");
	}
}

//helper function
function success(req, res, userID) {
	res.setHeader("Location", "/");
  	res.statusCode = 302;
  	res.end();
}

//helper function
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["upgradeuser.html"]({
    errorMessage: errorMessage,
		user: req.session.user
  });
  var html = templates["layout.html"]({
    title: "Upgrade a User",
    boxes: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = upgradeUserPost;