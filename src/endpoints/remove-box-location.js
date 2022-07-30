const templates = require('../templates');
const Database = require('better-sqlite3');
const db = require('../database');
const serveError = require('../serve-error');

function removeBoxLocation(req, res) {
	var locationName = req.body.locationName;
	var locationLat = req.body.latitude;
	var locationLng = req.body.longitude;

	console.log(locationName, locationLat, locationLng);

	var removeLocationQuery = db.prepare("DELETE FROM boxes WHERE name = ? AND lat = ? AND lng = ?").run(locationName, locationLat, locationLng);
	console.log("LOCATION HAS BEEN REMOVED!");

	res.setHeader("Location", "/");
	res.statusCode = 302;
	res.end();
}

module.exports = removeBoxLocation;