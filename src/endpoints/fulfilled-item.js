const Database = require('better-sqlite3');
const db = require('../database');
const templates = require('../templates');

function fulfilledItem(req, res, next) {

	const filledRequest = req.body.checkbox;
	var filledRequestItem = db.prepare("SELECT request FROM requestChest WHERE id = ?").get(filledRequest);

  if(!req.session.user) return res.writeHead(302, {Location: "/signin"}).end();
	if(req.session.user.roles === 1 || req.session.user.roles === 0) {
			var updateFilled = db.prepare("UPDATE requestChest SET fulfilled = 1 WHERE request = ?").run(filledRequestItem);
			var updatedFilledBy = db.prepare("UPDATE requestChest SET filledBy = ? WHERE request = ?").run(req.session.user.name, filledRequestItem);

			console.log("DATABASE UPDATE TO FULFILLED!");
			console.log("INSIDE FULFILLED IF CASE");
			res.redirect(301, `/boxes/${id}`);

		} else {
			return res.writeHead(302, {Location: "/signin"}).end();
		}
}


module.exports = fulfilledItem;