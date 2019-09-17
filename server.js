const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const userRouter = require('./routers/userRouter');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api', userRouter);

server.get('/', (req, res) => {
  res.status(200).json({ hello: "world", recieved: req.body });
});

module.exports = server;
