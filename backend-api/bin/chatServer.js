const chatApp = require('../app').chatApp;
const serverHelper = require('../helpers/serverHelpers');
const http = require('http');

const port = serverHelper.normalizePort(process.env.CHAT_APP_PORT || '3002');

// Create chat server on port 3002
chatApp.set('port', port);
const server = http.createServer(chatApp);

// Create websocket server using same port
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

const chatHistory = [];
const chatMessageType = {
  message: 'message',
  newUser: 'newUser'
};
const eventTypes = {
  fullChatHistory: 'fullChatHistory',
  newMessage: 'newMessage',
  newUser: 'newUser'
};

// Upon new client connection, send chat history
const handleNewConnection = (socket) => {
  const msg = {
    type: eventTypes.fullChatHistory,
    eventData: {
      chatHistory
    }
  };
  console.log('A new client connected, sending chat history');
  socket.send(JSON.stringify(msg));
}

// Save new message to chat history and broadcast new message to all connected clients
const handleNewMessage = (message) => {
  chatHistory.push(message);
  console.log('Updated Chat History');

  const newMsgData = {
    type: eventTypes.newMessage,
    eventData: {
      message
    }
  };

  console.log('Broadcasting new message');
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newMsgData));
    }
  });
}

// Send new user connection ackowledgement to all clients
const handleNewUser = (socket, user) => {
  const newUserData = {
    type: eventTypes.newUser,
    eventData: {
      user
    }
  };
  console.log(`Sending acknowledgement of new user: ${JSON.stringify(user)}`);
  socket.send(JSON.stringify(newUserData));

  const newUserMsg = {
    type: chatMessageType.newUser,
    user: user
  };
  chatHistory.push(newUserMsg);

  const newUserMessageData = {
    type: eventTypes.newMessage,
    eventData: {
      message: newUserMsg
    }
  };
  console.log(`Broadcasting new user joined: ${JSON.stringify(newUserData)}`);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newUserMessageData));
    }
  });
}

// Upon connection to websocket server, send ackowledgment and handle user and message input
wss.on("connection", socket => {
  handleNewConnection(socket);

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case eventTypes.newMessage:
        handleNewMessage(data.message);
        break;
      case eventTypes.newUser:
        handleNewUser(socket, data.user);
        break;
      default:
        console.log(`Unknown message type: ${data.type}`);
    }
  };
});

module.exports = {
  server,
  port
};

