const Database = require('better-sqlite3');
const db = require('../database');
const templates = require('../templates');

function createRequest(req, res, next) {
  
  let fulfilled = 0;
  const request = req.body.chestRequest;
  const id = parseInt(req.params.id, 10);
  
  var session = req.session;
  console.log("CREATE REQUEST USER SESSION ROLE: ", req.session.user.roles);
  
  if(!req.session.user) return res.writeHead(302, {Location: "/signin"}).end();
  if(req.session.user.roles === 1 || req.session.user.roles === 0) {
    var insertQuery = db.prepare("INSERT INTO requestChest (box_id, request, fulfilled, user_id) VALUES (?, ?, ?, ?)").run(id, request, fulfilled, req.session.user.email);
    var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${box.lat},${box.lng}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C${box.lat},${box.lng}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0`;

    var requestItems = db.prepare("SELECT * FROM requestChest WHERE box_id = ?").all(id);

    res.redirect(301, `/boxes/${id}`);
  } else {
    return res.writeHead(302, {Location: "/signin"}).end();
  }
}

module.exports = createRequest;
