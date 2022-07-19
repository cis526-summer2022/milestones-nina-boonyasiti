const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["signup.html"]({
    errorMessage: ""
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", form.length);
  res.end(form);
}