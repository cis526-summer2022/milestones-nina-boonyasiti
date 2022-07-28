const Database = require('better-sqlite3');
const db = require('../database');
const templates = require('../templates');

function fulfilledItem(req, res, next) {
	//detect onclick from checkbox and update database to mark fulfilled as 1.
  const id = parseInt(req.params.id, 10);
	var request = db.prepare("SELECT request FROM requestChest WHERE id = ?").get(id);
	// console.log("REQUEST IS: ", filledRequests.value);

	console.log("REQ INSIDE FULFILLED ITEM: ", id);
	var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
	let boxID = box.id;
	const requestItems = db.prepare("SELECT * FROM requestChest WHERE box_id = ?").all(boxID);


  if(!req.session.user) return res.writeHead(302, {Location: "/signin"}).end();
	if(req.session.user.roles === 1 || req.session.user.roles === 0) {
			// var updateFilled = db.prepare("UPDATE requestChest SET fulfilled = 1 WHERE request = ?").run(request.request);
			// var updatedFilledBy = db.prepare("UPDATE requestChest SET filledBy = ? WHERE request = ?").run(req.session.user.name, request);
			// console.log("DATABASE UPDATE TO FULFILLED!");
		console.log("INSIDE FULFILLED IF CASE");
    res.redirect(301, `/boxes/${id}`);

		} else {
			return res.writeHead(302, {Location: "/signin"}).end();
		}
}


module.exports = fulfilledItem;