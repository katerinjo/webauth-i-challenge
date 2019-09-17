const users = require('../data/userData');
const bcrypt = require('bcrypt');

function restricted(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.user) {
    const { username, password } = req.session.user;
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
  } else {
    res.status(401).json({ message: "You aren't logged in."});
  }
}

module.exports = restricted;
