const db = require('../database');
const templates = require('../templates');

function serveHomepage(req, res) {
  var boxes = db.prepare('SELECT * FROM boxes;').all();
  var box = boxes[0];
  var title = box.title;
	const url = `https://maps.googleapis.com/maps/api/staticmap?center=\${${box.lat}},\${${box.lng}}&zoom=15&size=200x200&markers=size:mid%7Ccolor:purple%7C\${${box.lat}},\${${box.lng}}&key=AIzaSyCX8V4KyBtUv7RdOXkeZyGa11wrxlTSVx0`;
	var boxHtml = templates['show-box.html']({boxID: box.id, title: title, url: url});
  var boxListHtml = templates['box-list.html']({boxes: boxes});
  var html = templates['layout.html']({box: boxHtml, list: boxListHtml, title: title})
  
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;