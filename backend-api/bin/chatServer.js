#!/usr/bin/env node

/**
 * Module dependencies.
 */

const chatApp = require('../app').chatApp;
const serverHelper = require('../helpers/serverHelpers');
const http = require('http');

const port = serverHelper.normalizePort(process.env.CHAT_APP_PORT || '3002');

chatApp.set('port', port);
const server = http.createServer(chatApp);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

/**
 * 
 */
const chatHistory = [];
const msgTypes = {
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
      case msgTypes.newMessage:
        handleNewMessage(data.message);
        break;
      case msgTypes.newUser:
        handleNewUser(data.user);
        break;
      default:
        console.log(`Unknown message type: ${data.type}`);
    }
  };
});

function handleNewConnection(socket) {
  const msg = {
    type: msgTypes.fullChatHistory,
    chatHistory
  };

  console.log(`A new client connected, sending chat history ${JSON.stringify(msg)}`);
  socket.send(JSON.stringify(msg));
}

function handleNewMessage(message) {
  chatHistory.push(message);
  console.log(`Updated Chat History: \n${JSON.stringify(chatHistory)}`);

  const newMsgData = {
    type: msgTypes.newMessage,
    message: message
  };

  console.log(`Broadcasting new message: ${JSON.stringify(newMsgData)}`);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newMsgData));
    }
  });
}

function handleNewUser(user) {
  const newUserData = {
    type: msgTypes.newUser,
    user
  };

  console.log(`Broadcasting new user: ${JSON.stringify(newUserData)}`);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newUserData));
    }
  });
}

module.exports = {
  server,
  port
};

