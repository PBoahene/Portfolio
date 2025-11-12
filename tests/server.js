// Minimal static server used by tests (no external deps)
const http = require('http');
const fs = require('fs');
const path = require('path');

function serveOnce(port = 3000) {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(__dirname, '..', reqPath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Not found');
      }
      let type = 'text/html';
      if (filePath.endsWith('.js')) type = 'application/javascript';
      if (filePath.endsWith('.css')) type = 'text/css';
      if (filePath.endsWith('.svg')) type = 'image/svg+xml';
      if (filePath.endsWith('.json')) type = 'application/json';
      res.writeHead(200, { 'Content-Type': type });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

module.exports = serveOnce;
