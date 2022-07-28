const templates = require('../templates');
const Database = require('better-sqlite3');
const db = require('../database');
const serveError = require('../serve-error');

function submitBoxLocation(req, res) {
	var locationName = req.body.locationName;
	var locationLat = req.body.latitude;
	var locationLong = req.body.longitude;

	var existingLocation = db.prepare("SELECT * FROM boxes WHERE name = ?").get(locationName);

	if(existingLocation) return failure(req, res, `The location with the name "${locationName}" already exists in the database.`); 

	if(locationName === "" || locationLat === "" || locationLong === "") {
		return failure(req, res, `There are missing entry fields`);
	}

	if(!existingLocation) {
		var insertQuery = db.prepare("INSERT INTO boxes (name, lat, lng) VALUES (?, ?, ?);").run (locationName, locationLat, locationLong);

		res.setHeader("Location", "/");
  	res.statusCode = 302;
  	res.end();
	}
}

//helper function
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["new-box-location.html"]({
    errorMessage: ""
  });
  var html = templates["layout.html"]({
    title: "Submit a new Community Chest location",
    boxes: form,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = submitBoxLocation;