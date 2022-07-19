const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');

function createSession(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	console.log(email, password);

	var returningUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

	if(!returningUser) return failure(req, res, "Username/Password not found.  Please try again.");
	if(email === "" || password === "") {
		return failure(req, res, `There are missing entry fields`)
	}

	bcrypt.compare(password, returningUser.encryptedPassword, (err, result) => {
    if(err) return serveError(req, res, 500, err);
    if(result) success(req, res, returningUser);
    else return failure(req, res, "Username/Password not found. Please try again.");
  });
}

//helper function
function success(req, res, user) {
	res.end(`Welcome ${user.name}.  You logged in successfully!`);
}

//helper function
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["signin.html"]({
    errorMessage: errorMessage
  });
  var html = templates["layout.html"]({
    title: "Sign Up",
    boxes: form
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = createSession;