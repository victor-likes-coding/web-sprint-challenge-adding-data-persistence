// build your server here and require it from index.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectsRouter = require('./projects/projects-router');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/projects', projectsRouter);

module.exports = server;
