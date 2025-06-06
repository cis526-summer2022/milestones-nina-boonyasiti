const db = require('../database');
const templates = require('../templates');
const createRequest = require('./create-request');

async function showBox(req, res) {
  const id = parseInt(req.params.id, 10);
	var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
	let boxID = box.id;
	let title = box.name;
	let lat = box.lat;
	let lng = box.lng;
	const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C${lat},${lng}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0`;

	const requestItems = db.prepare("SELECT * FROM requestChest WHERE box_id = ?").all(boxID);
	if (!req.session.user) {
		var noUser = 0;
		var noHtml = templates["show-box.html"]({boxID: box.id, title: box.name, url: url, requestItems: requestItems, user: noUser});
		res.setHeader("Content-Type", "text/html");
		res.setHeader("Content-Length", noHtml.length);
		res.send(noHtml);
	} else {
		var html = templates["show-box.html"]({boxID: box.id, title: box.name, url: url, requestItems: requestItems, user: req.session.user});
		res.setHeader("Content-Type", "text/html");
		res.setHeader("Content-Length", html.length);
		res.send(html);
	}
	
}

module.exports = showBox;