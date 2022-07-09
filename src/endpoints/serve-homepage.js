const db = require('../database');
const templates = require('../templates');

function serveHomepage(req, res) {
  var boxes = db.prepare("SELECT * FROM boxes ORDER BY date DESC").all();
  var box = boxes[0];
  var boxHtml = templates['box.html'](post);
  var listHtml = templates['box-list.html']({posts: posts});
  var title = box.title;
  var html = templates['layout.html']({box: postHtml, list: listHtml, title: title});

  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;