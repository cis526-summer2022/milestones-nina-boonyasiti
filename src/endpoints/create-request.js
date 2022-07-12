const Database = require('better-sqlite3');
const db = require('../database');
const templates = require('../templates');

function createRequest(req, res, next) {
  
  let fulfilled = 1;

  const request = req.body.title;

  var insertQuery = db.prepare("INSERT INTO requestChest (box_id, request, fulfilled) VALUES (?, ?, ?)").run(req.params.id, request, fulfilled);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(req.params.id);
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${box.lat},${box.lng}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C${box.lat},${box.lng}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0`;

  var requestItems = db.prepare("SELECT * FROM requestChest WHERE box_id = ?").all(req.params.id);

  	var html = templates["show-box.html"]({boxID: req.params.id, title: box.name, url: url, requestItems: requestItems});

	res.setHeader("Content-Type", "text/html");
	res.setHeader("Content-Length", html.length);

  res.send(html);
}

module.exports = createRequest;
