const db = require('../database');

function createRequest(req, res) {
  var id = req.body.title;
  var name = req.body.content;
  var lat = req.body.content;
  var lng = req.body.content;
  
  var info = db.prepare("INSERT INTO BOXES (id, name, lat, lng) VALUES (?, ?, ?, ?)").run(id, name, lat, lng);
  
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  res.writeHead(302, {"Location": `posts/${info.lastInsertRowid}`}).end();
}

module.exports = createRequest;