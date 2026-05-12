function getUsers() {
  return JSON.parse(sessionStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  sessionStorage.setItem('users', JSON.stringify(users));
}

function findUser(username) {
  return getUsers().find(function(user) {
    return user.username === username;
  }) || null;
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

async function addUser(displayName, username, password) {
  var users = getUsers();
  var salt = createSalt();
  var hash = await hashPassword(password, salt);

  users.push({
    displayName: displayName,
    username: username,
    salt: salt,
    hash: hash
  });
  saveUsers(users);
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
