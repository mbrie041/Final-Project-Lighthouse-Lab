const serverHelper = require('../helpers/serverHelpers');

const chatServer = require('./chatServer');
const statsServer = require('./statsServer');

// Start chat and stats servers over specific ports
serverHelper.startServer(chatServer.server, 'chat', chatServer.port);
serverHelper.startServer(statsServer.server, 'stats', statsServer.port);