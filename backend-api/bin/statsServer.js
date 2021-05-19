#!/usr/bin/env node

/**
 * Module dependencies.
 */

const statsApp = require('../app').statsApp({ updateLeaderboard });
const serverHelper = require('../helpers/serverHelpers');
const http = require('http');

const port = serverHelper.normalizePort(process.env.STATS_APP_PORT || '3001');

statsApp.set('port', port);
const server = http.createServer(statsApp);

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

/* Define updateLeaderboard function */

function updateLeaderboard(id, name, score, time) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "UPDATE_LEADERBOARD",
          id,
          name,
          score,
          time
        })
      );
    }
  });
}

// serverHelper.startServer(server, 'stats', port);

module.exports = {
  server,
  port
};

