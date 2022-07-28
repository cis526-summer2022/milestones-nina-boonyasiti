const bcrypt = require('bcrypt');
const templates = require('../templates');
const Database = require('better-sqlite3');
const db = require('../database');
const serveError = require('../serve-error');

function createUser(req, res) {
	var email = req.body.email;
	var name = req.body.name;
	var password = req.body.password;
	var role = 0;
	console.log(email, name, password);

	var existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

	if(existingUser) return failure(req, res, `The email "${email}" is already associate with an account.`);
	if(email === "" || name === "" || password === "") {
		return failure(req, res, `There are missing entry fields`);
	}

	const passes = 10;
	bcrypt.hash(password, passes, (err, hash) => {
		if(err) return serveError(req, res, 500, err);
			var insertQuery = db.prepare("INSERT INTO users (email, name, encryptedPassword, roles) VALUES (?, ?, ?, ?);").run(email, name, hash, role);
			if(insertQuery){
				success(req, res);
			} else {
				failure(req, res, "An error occurred.  Please try again.");
			}
	});

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
  var form = templates["signup.html"]({
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

module.exports = createUser;
