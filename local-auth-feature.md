# [feature] Connect signup, login, and home page using sessionStorage as user store

## Description

Wire the three pages together into a complete client-side authentication flow. `signup.html` saves new users to `sessionStorage`. `login.html` validates submitted credentials against that store. On success, login saves the current session to `sessionStorage` and redirects to `home.html`. The home page reads the session and shows a welcome message, or redirects to `login.html` if no session exists. No server required - everything runs in the browser.

---

## Page Flow

```
home.html
  |
  |-- no session -> redirect to login.html
  |
  `-- session found -> show "Welcome, <display name>"
                         |
                         `-- Log out -> clear session -> redirect to login.html

login.html
  |
  |-- valid credentials -> save session -> redirect to home.html
  |-- unknown user      -> show inline error "User not found."
  |-- wrong password    -> show inline error "Incorrect password."
  `-- link              -> signup.html

signup.html
  |
  |-- username already exists -> show inline error "Username already taken."
  |-- all fields valid        -> save user to sessionStorage -> redirect to login.html
  `-- link                    -> login.html
```

---

## sessionStorage User Store Schema

All users are stored under a single key as a JSON array.

```js
// Key
'users'

// Value - JSON array of user objects
[
  {
    "username":    "alice@example.com",
    "displayName": "Alice",
    "password":    "Abc$1234"
  }
]
```

Reading and writing the store:

```js
function getUsers() {
  return JSON.parse(sessionStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  sessionStorage.setItem('users', JSON.stringify(users));
}

function findUser(username) {
  return getUsers().find(function(u) { return u.username === username; });
}

function addUser(displayName, username, password) {
  var users = getUsers();
  users.push({ displayName: displayName, username: username, password: password });
  saveUsers(users);
}
```

---

## Session Schema

The logged-in user is stored in `sessionStorage` - it clears automatically when the browser tab is closed.

```js
// Key
'currentUser'

// Value - JSON object
{
  "username":    "alice@example.com",
  "displayName": "Alice"
}
```

Reading and writing the session:

```js
function getSession() {
  return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
}

function saveSession(user) {
  sessionStorage.setItem('currentUser', JSON.stringify({
    username:    user.username,
    displayName: user.displayName
  }));
}

function clearSession() {
  sessionStorage.removeItem('currentUser');
}
```

---

## Per-page Responsibilities

**`signup.html`**

* Validate all fields using existing rules from Lessons 1-4
* On valid submit: check if username already exists in sessionStorage
  * If yes -> show inline error `"Username already taken."` on the username field
  * If no  -> call `addUser(...)` -> redirect to `login.html`
* Include link: `Already have an account? Log in -> login.html`

**`login.html`**

* Validate fields using existing rules from Lessons 1-4
* On valid submit: look up username in sessionStorage
  * If not found -> show inline error `"User not found."` on the username field
  * If found but password does not match -> show inline error `"Incorrect password."` on the password field
  * If found and password matches -> call `saveSession(user)` -> redirect to `home.html`
* Include link: `Don't have an account? Sign up -> signup.html`

**`home.html`**

* On load: call `getSession()`
  * If null -> `window.location.href = 'login.html'`
  * If found -> display `Welcome, <displayName>` and a Log out button
* Log out button: call `clearSession()` -> redirect to `login.html`

---

## File Structure

```
project/
|-- home.html
|-- login.html
|-- signup.html
|-- forms.css       <- shared styles from Lesson 3
|-- forms.js        <- shared validation helpers from Lesson 3
`-- store.js        <- new: sessionStorage helpers
```

`store.js` is a plain JS file included via `<script src="store.js"></script>` in all three pages. It exposes `getUsers`, `saveUsers`, `findUser`, `addUser`, `getSession`, `saveSession`, and `clearSession` as global functions.

---

## Acceptance Criteria

* [ ] Visiting `home.html` without a session redirects to `login.html`
* [ ] Visiting `home.html` with a valid session shows `Welcome, <displayName>` and a Log out button
* [ ] Log out clears the session and redirects to `login.html`
* [ ] `signup.html` saves a new user to `sessionStorage` on valid submit and redirects to `login.html`
* [ ] `signup.html` shows `"Username already taken."` if the email is already registered
* [ ] `login.html` shows `"User not found."` if the username does not exist in `sessionStorage`
* [ ] `login.html` shows `"Incorrect password."` if the username exists but the password does not match
* [ ] `login.html` saves the session to `sessionStorage` and redirects to `home.html` on successful login
* [ ] `login.html` includes a link to `signup.html`
* [ ] `signup.html` includes a link to `login.html`
* [ ] Closing the browser tab clears both the registered users store and the current session - the user must sign up and log in again on next visit
* [ ] Registered users persist across page reloads in the same tab because `sessionStorage` is not cleared on refresh
* [ ] All shared helpers live in `store.js` - no direct sessionStorage calls outside that file
* [ ] All existing validation rules from Lessons 1-4 remain in place on both login and signup

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
