const templates = require('../templates');
const db = require('../database');

function newBox(req, res) {
  var boxes = db.prepare('SELECT * FROM boxes;').all();
  var box = boxes[0];
  var title = box.title;
  var html = templates["new-box.html"]({title: title});
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", "text/html");
  res.end(html);
}

module.exports = newBox;