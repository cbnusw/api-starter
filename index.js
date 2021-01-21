const http = require('http');
const app = require('./app');

const { PORT } = require('./env');
const { debug, error } = require('./utils/logger');

const server = http.createServer(app);

server.listen(+PORT);
server.on('error', error);
server.on('listening', () => {
  const addr = server.address();
  debug(`Server running on ${addr.address}:${addr.port}`);
});
