const users = require('../data/userData');
const bcrypt = require('bcrypt');

function restricted(req, res, next) {
  const { username, password } = req.headers;
  users.readUser(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

module.exports = restricted;
