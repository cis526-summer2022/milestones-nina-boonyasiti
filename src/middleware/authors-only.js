const serveError = require('../serve-error');

function authorsOnly(req, res, next) {
  var session = req.session;
  console.log("REQ. SESSION: ", req.session);
  if(req.session === false) next();
  if(req.session.user.roles === 1 || req.session.user.roles === 0) next();
  else serveError(req, res, 403, `User with role ${req.session.user.roles} attempted to use an author-only route`);
}

module.exports = authorsOnly;