const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["remove-box-location.html"]({
    errorMessage: "",
    user: req.session.user
  });
  var html = templates["layout.html"]({
    title: "Remove a Community Chest location",
    boxes: form,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}