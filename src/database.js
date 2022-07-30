const Database = require('better-sqlite3');

module.exports = new Database('src/db/community-chest.sqlite3');