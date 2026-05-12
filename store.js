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

function addUser(displayName, username, password) {
  var users = getUsers();
  users.push({
    displayName: displayName,
    username: username,
    password: password
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
