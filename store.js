function getUser(username) {
  var raw = localStorage.getItem('users/' + username);
  return raw ? JSON.parse(raw) : null;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(function(byte) {
    return byte.toString(16).padStart(2, '0');
  }).join('');
}

function createSalt() {
  var bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

async function hashPassword(password, salt) {
  var encoder = new TextEncoder();
  var data = encoder.encode(salt + password);
  var hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bytesToHex(new Uint8Array(hashBuffer));
}

async function setUser(displayName, username, password) {
  var salt = createSalt();
  var hash = await hashPassword(password, salt);

  var user = {
    displayName: displayName,
    username: username,
    salt: salt,
    hash: hash
  };

  localStorage.setItem('users/' + username, JSON.stringify(user));
}

function getSession() {
  return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
}

function saveSession(user) {
  sessionStorage.setItem('currentUser', JSON.stringify({
    username: user.username,
    displayName: user.displayName
  }));
}

function clearSession() {
  sessionStorage.removeItem('currentUser');
}
