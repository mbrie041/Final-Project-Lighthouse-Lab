// const serverHelper = require('../helpers/serverHelpers');
const chatApp = require('../app').chatApp;
const serverHelper = require('../helpers/serverHelpers');
const http = require('http');

const port = serverHelper.normalizePort(process.env.CHAT_APP_PORT || '3002');

chatApp.set('port', port);
const server = http.createServer(chatApp);

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

wss.on("connection", socket => {
  handleNewConnection(socket);

  socket.onmessage = event => {
    console.log(`Message Received: ${JSON.stringify(event.data)}`);
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

function handleNewConnection(socket) {
  const msg = {
    type: eventTypes.fullChatHistory,
    eventData: {
      chatHistory
    }
  };

  console.log(`A new client connected, sending chat history ${JSON.stringify(msg)}`);
  socket.send(JSON.stringify(msg));
}

function handleNewMessage(message) {
  chatHistory.push(message);
  console.log(`Updated Chat History: \n${JSON.stringify(chatHistory)}`);

  const newMsgData = {
    type: eventTypes.newMessage,
    eventData: {
      message
    }
  };

  console.log(`Broadcasting new message: ${JSON.stringify(newMsgData)}`);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newMsgData));
    }
  });
}

function handleNewUser(socket, user) {
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


serverHelper.startServer(server, 'chat', port);

// module.exports = {
//   server,
//   port
// };

