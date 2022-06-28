const http = require('http');
const fs = require('fs');
const serveFile = require('./serve-file');
const html = fs.readFileSync('static/index.html');
const css = fs.readFileSync('static/site.css');
const js = fs.readFileSync('static/site.js');

function handleRequest(req, res) {
	if(req.url === '/') req.url = '/index.html';
	console.log('req.url', req.url);
    if(req.method === "GET") {
        switch(req.url) {
            case "index.html":
                res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length}).end(html);
                break;
            case "site.css":
                res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': css.length}).end(css);
                break;
            case "site.js":
                res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': js.length}).end(js);
                break;
			case "/":
				res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': 0});
				break;
            default:
                res.writeHead(404).end();
        }
    } else {
        res.writeHead(501).end();
    }
}

module.exports = handleRequest;
