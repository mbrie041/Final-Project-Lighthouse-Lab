const serverHelper = require('../helpers/serverHelpers');

const chatServer = require('./chatServer');
const statsServer = require('./statsServer');

serverHelper.startServer(chatServer.server, 'chat', chatServer.port);
serverHelper.startServer(statsServer.server, 'stats', statsServer.port);