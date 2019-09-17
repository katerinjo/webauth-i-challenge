const router = require('express').Router();
const bcrypt = require('bcrypt');
const users = require('../data/userData');
const restricted = require('../middleware/restricted');
const session = require('express-session');

const sessionConfig = {
  name: 'user-session',
  secret: process.env.SESSION_SECRET || "it's a secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.SESSION_SECURE || true,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};

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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  users.readUser(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', restricted, (req, res) => {
  users.allUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
