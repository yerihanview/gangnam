const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };

http.createServer((request, response) => {
  const file = path.join(root, request.url === '/' ? 'index.html' : request.url);
  fs.readFile(file, (error, content) => {
    if (error) {
      response.statusCode = 404;
      response.end('Not found');
      return;
    }
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    response.end(content);
  });
}).listen(4173, '127.0.0.1');
