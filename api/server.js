// build your server here and require it from index.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectsRouter = require('./project/router');
const resourcesRouter = require('./resource/router');
const taskRouter = require('./task/router');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/projects', projectsRouter);
server.use('/api/resources', resourcesRouter);
server.use('/api/tasks', taskRouter);

module.exports = server;
