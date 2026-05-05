const http = require('http');
const fs = require('fs');
const path = require('path');
const { createSession, getSession, deleteSession } = require('./store');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8'
};

function parseCookie(req) {
  const cookie = req.headers.cookie || '';
  const match  = cookie.match(/session=([^;]+)/);
  return match ? match[1] : null;
}

function readBody(req) {
  return new Promise(function(resolve) {
    let data = '';
    req.on('data', function(chunk) { data += chunk; });
    req.on('end', function() {
      resolve(Object.fromEntries(new URLSearchParams(data)));
    });
  });
}

function homePage(username) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
</head>
<body>
  <h1>Welcome, ${username}</h1>
  <a href="/logout">Log out</a>
</body>
</html>`;
}

function redirect(res, location, cookieHeader) {
  const headers = { Location: location };
  if (cookieHeader) headers['Set-Cookie'] = cookieHeader;
  res.writeHead(302, headers);
  res.end();
}

function serveStatic(res, fileName) {
  const filePath = path.join(PUBLIC_DIR, fileName);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}

const server = http.createServer(async function(req, res) {
  const method = req.method;
  const url = req.url.split('?')[0];

  if (method === 'GET' && url === '/') {
    const sessionId = parseCookie(req);
    const username = sessionId ? getSession(sessionId) : null;
    if (!username) {
      redirect(res, '/login');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(homePage(username));
    return;
  }

  if (method === 'GET' && url === '/login') {
    serveStatic(res, 'login.html');
    return;
  }

  if (method === 'POST' && url === '/login') {
    const body = await readBody(req);
    const username = (body.username || '').trim();
    const password = (body.password || '').trim();
    if (!username || !password) {
      redirect(res, '/login');
      return;
    }
    const sessionId = createSession(username);
    redirect(res, '/', `session=${sessionId}; HttpOnly; Path=/`);
    return;
  }

  if (method === 'GET' && url === '/logout') {
    const sessionId = parseCookie(req);
    if (sessionId) deleteSession(sessionId);
    redirect(res, '/login', 'session=; HttpOnly; Path=/; Max-Age=0');
    return;
  }

  if (method === 'GET' && (url.endsWith('.html') || url.endsWith('.css'))) {
    serveStatic(res, url.replace(/^\/+/, ''));
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, function() {
  console.log(`Server running at http://localhost:${PORT}`);
});
