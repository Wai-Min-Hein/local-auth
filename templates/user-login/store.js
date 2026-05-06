const crypto = require('crypto');

const sessions = new Map();

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
