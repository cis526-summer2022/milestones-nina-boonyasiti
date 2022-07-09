const fs = require('fs');
const path = require('path');
const express = require('express')
var files = fs.readdirSync(path.join(__dirname, 'templates'));
var templates = {};

files.forEach(file => {
  const templateString = fs.readFileSync(path.join(__dirname,'/templates', file), {encoding: "utf8"});
	templates[path.basename(file, '.ejs')] = express.static(path.join (__dirname, templateString));
});

module.exports = templates;