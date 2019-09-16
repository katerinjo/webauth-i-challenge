const express = require('express');
const server = express();

const userRouter = require('../routers/userRouter');

server.use(express.json());

server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.status(200).send({hello: "world"});
});

module.exports = server;
