const Database = require('better-sqlite3');
const db = require('../database');
const templates = require('../templates');

function fulfilledItem(req, res, next) {

	const filledRequestID = req.body.checkbox;
	var filledRequestItem = db.prepare("SELECT request FROM requestChest WHERE id = ?").get(filledRequestID);
	console.log("REQUEST ITEM ID: ", filledRequestID);
	console.log("FILLED REQUEST ITEM: ", filledRequestItem.request);


  if(!req.session.user) return res.writeHead(302, {Location: "/signin"}).end();
	if(req.session.user.roles === 1 || req.session.user.roles === 0) {
			var updateFilledQuery = db.prepare("UPDATE requestChest SET fulfilled = 1 WHERE request = ?").run(filledRequestItem.request);
			var updateFilledByQuery = db.prepare("UPDATE requestChest SET filledBy = ? WHERE request = ?").run(req.session.user.name, filledRequestItem.request);

			console.log("DATABASE UPDATE TO FULFILLED!");
			console.log("INSIDE FULFILLED IF CASE");
			res.redirect(301, `/`);

		} else {
			return res.writeHead(302, {Location: "/signin"}).end();
		}
}


module.exports = fulfilledItem;