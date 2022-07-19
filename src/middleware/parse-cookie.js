function parseCookie(req, res, next) {
	req.cookies = {};
	var cookieString = req.headers.cookie;
  	var pairStrings = cookieString.split(";");

	pairStrings.forEach(function(pairString) {
		var pair = pairString.split("=");
		var key = pair[0].trim();
		var value = pair[1].trim();
		req.cookies[key] = value;
	})

	console.log(req.cookies);
	next();
}

module.exports = parseCookie;