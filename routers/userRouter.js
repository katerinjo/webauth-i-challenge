const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../data/userData');

router.get('/', (req, res) => {
  res.status(200).json({ route: req.url, recieved: req.body });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);

  users.createUser({ username, password: hash })
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
