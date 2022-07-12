const Database = require('better-sqlite3');
const db = require('../database');

function getCommunityChests(req, res) {
  const chests = db.prepare('SELECT * FROM boxes;').all();
  res.send(chests);
}

module.exports = getCommunityChests;