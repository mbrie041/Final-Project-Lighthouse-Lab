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

wss.on("connection", socket => {
  console.log("A client connected.");
  // socket.send("Welcome New Client!");

  // socket.onmessage = event => {
  //   console.log(`Message Received event.data: ${event.data}`);
  //   console.log(`Message Received event: ${event}`);

  //   if (event.data === "ping") {
  //     socket.send(JSON.stringify("pong"));
  //   }
  // };
});

module.exports = {
  server,
  port
};

