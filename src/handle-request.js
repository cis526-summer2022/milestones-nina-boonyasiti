const http = require('http');
const fs = require('fs');
const serveFile = require('./serve-file');
const html = fs.readFileSync('static/index.html');
const css = fs.readFileSync('static/site.css');
const js = fs.readFileSync('static/site.js');
const json = fs.readFileSync('static/box-locations.json');
// const png1 = fs.readFileSync('static/favicon-16x16.png');
// const png2 = fs.readFileSync('static/favicon-32x32.png');
// const png3 = fs.readFileSync('static/favicon-64x64.png');


function handleRequest(req, res) {
	if(req.url === '/') req.url = '/index.html';
    if(req.method === "GET") {
        switch(req.url) {
            case "/index.html":
                res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length}).end(html);
                break;
            case "/site.css":
                res.writeHead(200, {'Content-Type': 'text/css', 'Content-Length': css.length}).end(css);
                break;
            case "/site.js":
                res.writeHead(200, {'Content-Type': 'text/javascript', 'Content-Length': js.length}).end(js);
                break;
			case "/box-locations.json":
                res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': json.length}).end(json);
                break;
            // case "/favicon-16x16.png":
            //     res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': png1.length}).end(png1);
            //     break;
            default:
                res.writeHead(404).end();
        }
    } else {
        res.writeHead(501).end();
    }
}

module.exports = handleRequest;
