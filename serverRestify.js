const restify = require('restify');
const app = require('./app');
const port = process.env.Port || 3000;

const server = restify.createServer(app);
server.listen(port)