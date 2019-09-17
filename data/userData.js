const db = require('./dbConfig');

function createUser(userData) {
  return db('users').insert(userData);
}

function readUser(username) {
  return db('users').where({ username }).select();
}

function allUsers() {
  return db('users').select();
}

module.exports = {
  createUser,
  readUser,
  allUsers
}
