# User Login

Minimal Node.js login server using only built-in modules (`http`, `fs`, `crypto`, `url`, `path`). No npm install, no framework.

## Project structure

```
user-login/
├── server.js       # HTTP server + routing
├── store.js        # In-memory session store
└── public/
    ├── login.html  # Login form (standard POST, no JS)
    └── forms.css   # Form styles
```

## Run

```bash
node server.js
```

Server listens on `http://localhost:3000`.

## Routes

| Method | Path      | Behaviour                                                                 |
| ------ | --------- | ------------------------------------------------------------------------- |
| GET    | `/`       | Valid session → home page. Otherwise → redirect to `/login`.              |
| GET    | `/login`  | Serves `public/login.html`.                                               |
| POST   | `/login`  | Non-empty username + password → set `session` cookie → redirect to `/`. Empty → redirect to `/login`. |
| GET    | `/logout` | Clears `session` cookie → redirect to `/login`.                           |

## Test in a browser

1. Start the server: `node server.js`
2. Open `http://localhost:3000/` — you should be redirected to `/login`.
3. Submit any non-empty username and password.
4. You land on `/` with `Welcome, <username>`.
5. Click **Log out** — you return to `/login` and the session cookie is cleared.
6. Submit empty fields — you bounce back to `/login`.

## Test with curl

```bash
# 1. Unauthenticated GET / redirects to /login
curl -i http://localhost:3000/

# 2. Login page loads
curl -i http://localhost:3000/login

# 3. Login sets a session cookie and redirects to /
curl -i -X POST -d "username=alice&password=secret123" http://localhost:3000/login

# 4. Use the cookie from step 3 to load the home page
curl -b "session=<paste-id-here>" http://localhost:3000/

# 5. Empty credentials redirect back to /login
curl -i -X POST -d "username=&password=" http://localhost:3000/login

# 6. Logout clears the cookie
curl -i http://localhost:3000/logout
```

## Notes

- Sessions live in an in-memory `Map` and are lost on restart.
- Authentication accepts any non-empty username/password — no real user store.
- Cookie is `HttpOnly; Path=/` (no `Secure` flag because development is HTTP).
