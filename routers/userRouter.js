const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ route: req.url, recieved: req.body });
});

module.exports = router;
