const db = require('./database');

function createRequest(req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var date = new Date().valueOf();
  
  var info = db.prepare("INSERT INTO POSTS (title, content, date) VALUES (?, ?, ?)").run(title, content, date);
  
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  res.writeHead(302, {"Location": `posts/${info.lastInsertRowid}`}).end();
}

module.exports = createPost;