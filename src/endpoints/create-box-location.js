const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["new-box-location.html"]({
    errorMessage: ""
  });
  var html = templates["layout.html"]({
    title: "Submit a new Community Chest location",
    boxes: form,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}