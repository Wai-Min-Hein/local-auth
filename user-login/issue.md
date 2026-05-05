# [feature] User login — minimal Node.js server with session and protected home page

## Description

Create a minimal Node.js web server from scratch using only built-in modules (`http`, `fs`, `crypto`, `url`). No Express, no framework, no npm packages. The server has two paths: a protected home page and a login page. The login page reuses the `login.html` file built in earlier issues. The form submits via a standard HTML form POST — no fetch, no AJAX. On successful login the server sets a session cookie and redirects to the home page.

---

## Project Structure

```
project/
├── server.js
├── store.js
└── public/
    ├── login.html      ← reuse from earlier issues
    └── forms.css       ← reuse from earlier issues
```

---

## Server Paths

| Method   | Path        | Behaviour                                                                                                              |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/`       | Check session cookie. If valid → serve home page. If not → redirect to `/login`                                    |
| `GET`  | `/login`  | Serve `public/login.html`as a static file                                                                            |
| `POST` | `/login`  | Read form body. Authenticate user. On success → set cookie → redirect to `/`. On failure → redirect to `/login` |
| `GET`  | `/logout` | Clear session cookie → redirect to `/login`                                                                         |

---

## Acceptance Criteria

* [ ] Server starts with `node server.js` on port 3000 with no npm install required
* [ ] `GET /` redirects to `/login` if no valid session cookie is present
* [ ] `GET /` serves a dynamic home page showing `Welcome, <username>` if a valid session cookie is present
* [ ] `GET /login` serves the existing `login.html` file from the `public/` folder
* [ ] The login form in `login.html` submits to `POST /login` using `method="POST" action="/login"` — no fetch or AJAX
* [ ] `POST /login` reads the submitted `username` and `password` from the form body
* [ ] `POST /login` accepts any non-empty username and password combination (no real user store required)
* [ ] On successful login, server sets a `session` cookie (`HttpOnly; Path=/`) and redirects to `GET /`
* [ ] On failed login (empty username or password), server redirects back to `GET /login`
* [ ] `GET /logout` clears the session cookie and redirects to `GET /login`
* [ ] Home page includes a logout link that points to `/logout`
* [ ] Static files in `public/` (`.html`, `.css`) are served correctly by the server

---

## Implementation Notes

**Session store** — use an in-memory `Map` in `store.js`. No database needed.

```js
// store.js
const crypto = require('crypto');

const sessions = new Map(); // sessionId → username

function createSession(username) {
  const id = crypto.randomBytes(32).toString('hex');
  sessions.set(id, username);
  return id;
}

function getSession(sessionId) {
  return sessions.get(sessionId) || null;
}

function deleteSession(sessionId) {
  sessions.delete(sessionId);
}

module.exports = { createSession, getSession, deleteSession };
```

**Cookie parsing** — read the `Cookie` request header and extract the session id.

```js
function parseCookie(req) {
  const cookie = req.headers.cookie || '';
  const match  = cookie.match(/session=([^;]+)/);
  return match ? match[1] : null;
}
```

**Body parsing** — read the POST body as a URL-encoded string.

```js
function readBody(req) {
  return new Promise(function(resolve) {
    let data = '';
    req.on('data', function(chunk) { data += chunk; });
    req.on('end', function() {
      resolve(Object.fromEntries(new URLSearchParams(data)));
    });
  });
}
```

**Home page** — return a plain HTML string, not a static file.

```js
function homePage(username) {
  return `<!DOCTYPE html>
<html lang="en">
<body>
  <h1>Welcome, ${username}</h1>
  <a href="/logout">Log out</a>
</body>
</html>`;
}
```

---

# Status

* [ ] Aung Kaung Sett
* [ ] Aung Khant Kyaw
* [ ] Aung Min Khant
* [ ] Khant Nyi Aung
* [ ] Kyi Pyar Soe
* [ ] Min Banyar Chan
* [ ] Moe Pwint Phyu
* [ ] Pyone Si Thu
* [ ] Sandar Kyaw
* [ ] Thandar Nwe
* [ ] Tun Tun Myint
* [ ] Wai Min Hein
* [ ] Zar Chi Oo
* [ ] Zaw Hein Htet
